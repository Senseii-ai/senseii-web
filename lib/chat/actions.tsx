import 'server-only'

import {
  createAI,
  getMutableAIState,
  getAIState,
  createStreamableValue,
} from 'ai/rsc'

import { BotMessage, BotMessageTest } from '@/components/chat/message'

import { nanoid } from '@/lib/utils'
// import { saveChat } from '@/app/actions'
import { UserMessage } from '@/components/chat/message'
import { Message as OAIMessage } from 'openai/resources/beta/threads/messages'
import { auth } from '@/auth'
import { sendUserMessage } from '@/app/api/chat'
import React from 'react'
import { Session } from 'next-auth'
import { infoLogger } from '../logger/logger'
import { userAPI } from '../api/user/users'
import { IChat, message } from '@senseii/types'

//FIX: Currently we are relying on OpenAI to save our thread messages, therefore
// we are using it's messasge structure to render information. Later on we will
// save messages in our own database and therefore update the logic.

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()
  const session = (await auth()) as Session

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  console.log("IS AI STATE DIRECTLY UPDATED?", aiState)

  const stream = await sendUserMessage(aiState.get().chatId, content)
  if (!stream) {
    return {
      id: nanoid(),
      display: <div>Failed to get response from server</div>
    }
  }

  const readableStream = createStreamableValue(stream)

  async function saveAIState(value: string) {
    infoLogger({ message: "FINAL STATE SAVED", status: "failed" })
    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: 'assistant',
          content: value
        }
      ]
    })
  }

  // NOTE: Extending the AI state done method, to update the AI state at the end.
  const originalDone = readableStream.done
  readableStream.done = (...args: [any] | []) => {
    // Call the original done method
    const result = originalDone.apply(readableStream, args)
    // saving AI state with the response.
    saveAIState(readableStream.value as string)
    return result
  }

  return {
    id: nanoid(),
    display: <BotMessageTest content={readableStream.value} />
  }
}

export type ServerMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export type AIState = {
  chatId: string
  messages: ServerMessage[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState<typeof AI>() as AIState

      if (aiState) {
        console.log("GET UI STATE", aiState)
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return []
    }
  },
  onSetAIState: async ({ state }) => {
    'use server'

    infoLogger({ message: "I should be called twice", status: "failed" })

    const session = await auth() as Session

    if (session && session.user) {
      const { chatId, messages } = state
      console.log("BEFORE UPDATING AI STATE", state)
      console.log("BEFORE UPDATING AI STATE", state.messages)

      const createdAt = new Date().toISOString()
      const userId = session.user.email as string
      const path = `/chat/${chatId}`

      const firstMessageContent = messages[0].content
      const title = firstMessageContent.substring(0, 100)

      messages.map(item => {
        if (item.role === 'assistant') {
          // @ts-ignore
          const text = item.content.curr as string
          item.content = text
        }
      })

      const lastMessage = messages[messages.length - 1]

      const chat: IChat = {
        id: chatId,
        title,
        userId,
        threadId: '',
        createdAt: createdAt,
        messages: [lastMessage],
        path
      }

      await userAPI.saveChat(session, chat)
    } else {
      infoLogger({ message: "This should never run", status: "failed" })
      return
    }
  }
})

// VercelMessageFromOpenAIMessage converts OpenAI message to Vercel Supported Message
export const AppMessageFromOAIMesssage = (
  message: OAIMessage
): ServerMessage => {
  let newMessage: ServerMessage = {
    id: message.id,
    role: 'user',
    content: ''
  }

  if (message.content[0].type === 'text') {
    if (message.role === 'assistant') {
      newMessage = {
        id: message.id,
        content: message.content[0].text.value,
        role: message.role
      }
    } else {
      newMessage = {
        id: message.id,
        role: 'user',
        content: message.content[0].text.value
      }
    }
  }
  return newMessage
}

export const getUIStateFromAIState = (aiState: AIState) => {
  // write logic here to convert OpenAI messages into Vercel Supported Messages
  // FIX: check if we have to reverse things here.
  console.log('AI STATE', aiState)

  return aiState.messages.map((message, index) => {
    // const vercelAIMessage = VercelMessageFromOpenAIMessage(message) as Message
    return {
      id: message?.id,
      display:
        message.role === 'user' ? (
          <UserMessage>
            {React.createElement('div', null, message.content)}
          </UserMessage>
        ) : message?.role === 'assistant' &&
          typeof message.content === 'string' ? (
          <BotMessage content={message.content} />
        ) : null
    }
  })
}
