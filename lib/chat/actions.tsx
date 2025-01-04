import 'server-only'

import {
  createAI,
  getMutableAIState,
  getAIState,
  createStreamableValue
} from 'ai/rsc'

import { BotMessage } from '@/components/chat/message'

import { nanoid } from '@/lib/utils'
// import { saveChat } from '@/app/actions'
import { UserMessage } from '@/components/chat/message'
import { Message as OAIMessage } from 'openai/resources/beta/threads/messages'
import { auth } from '@/auth'
import { sendUserMessage } from '@/app/api/chat'
import React from 'react'
import { Session } from 'next-auth'

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
        role: "user",
        content
      }
    ]
  })

  const stream = await sendUserMessage(aiState.get().chatId, content)

  const readableStream = createStreamableValue(stream)
  const result = {
    value: (
      <>
        <BotMessage content={readableStream.value} />
      </>
    )
  }
  return {
    id: nanoid(),
    display: result.value
  }
}

export type ServerMessage = {
  id: string,
  role: 'user' | 'assistant';
  content: string;
};

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
      const aiState = getAIState() as AIState

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return []
    }
  },
  onSetAIState: async ({ state }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `${chatId}`

      const firstMessageContent = messages[0].content
      const title = firstMessageContent.substring(0, 100)

      // FIX: usually we save conversation state here, but we are depending OpenAI threads to hold
      // the state of Converstaions. This implementation might change in the future.
      // await saveChat(chat)
      // const chat Chat = {
      //   id: chatId,
      //   title,
      //   userId,
      //   createdAt,
      //   messages,
      //   path
      // }

    } else {
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
  console.log("AI STATE", aiState)

  return aiState.messages.map((message, index) => {
    // const vercelAIMessage = VercelMessageFromOpenAIMessage(message) as Message
    return {
      id: message?.id,
      display:
        message.role === 'user' ? (
          <UserMessage>
            {React.createElement(
              'div',
              null,
              message.content
            )}
          </UserMessage>
        ) : message?.role === 'assistant' &&
          typeof message.content === 'string' ? (
          <BotMessage content={message.content} />
        ) : null
    }
  })
}
