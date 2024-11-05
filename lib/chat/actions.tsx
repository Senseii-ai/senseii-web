import 'server-only'

import {
  createAI,
  getMutableAIState,
  getAIState,
  createStreamableValue
} from 'ai/rsc'

import {
  spinner,
  BotCard,
  BotMessage,
  Stock,
  Purchase
} from '@/components/stocks'

import { Events } from '@/components/stocks/events'
import { Stocks } from '@/components/stocks/stocks'
import { nanoid } from '@/lib/utils'
// import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { Chat, Message } from '@/lib/types'
import { auth } from '@/auth'
import { sendUserMessage } from '@/app/api/chat'
import { Session } from 'next-auth'
import React from 'react'

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()
  const { user } = (await auth()) as Session
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

  const stream = await sendUserMessage(
    user?.id as string,
    aiState.get().chatId,
    content
  )

  const readableStream = createStreamableValue(stream)
  const result = {
    value: (
      <BotCard>
        <BotMessage content={readableStream.value} />
      </BotCard>
    )
  }
  return {
    id: nanoid(),
    display: result.value
  }
}

export type AIState = {
  chatId: string
  messages: Message[]
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
      const aiState = getAIState() as Chat

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
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

      const firstMessageContent = messages[0]?.content as string
      const title = firstMessageContent.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }
      // INFO: usually we save conversation state here, but we are depending OpenAI threads to hold the state of Converstaions. This implementation might change in the future.
      // await saveChat(chat)
    } else {
      return
    }
  }
})

// VercelMessageFromOpenAIMessage converts OpenAI message to Vercel Supported Message
const VercelMessageFromOpenAIMessage = (message: any) => {
  let newMessage: Message
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
    return newMessage
  }
}

export const getUIStateFromAIState = (aiState: Chat) => {
  // write logic here to convert OpenAI messages into Vercel Supported Messages
  const aiStateMessages = aiState.messages
    .filter(message => message.role != 'system')
    .reverse()

  return aiStateMessages.map((message, index) => {
    const vercelAIMessage = VercelMessageFromOpenAIMessage(message) as Message
    return {
      id: vercelAIMessage?.id,
      display:
        message.role === 'user' ? (
          <UserMessage>
            {React.createElement(
              'div',
              null,
              vercelAIMessage?.content as string
            )}
          </UserMessage>
        ) : vercelAIMessage?.role === 'assistant' &&
          typeof vercelAIMessage.content === 'string' ? (
          <BotMessage content={vercelAIMessage.content} />
        ) : null
    }
  })
  // TODO: keeping this for future reference.
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'tool' ? (
          message.content.map(tool => {
            return tool.toolName === 'listStocks' ? (
              <BotCard>
                {/* TODO: Infer types based on the tool result*/}
                {/* @ts-expect-error */}
                <Stocks props={tool.result} />
              </BotCard>
            ) : tool.toolName === 'showStockPrice' ? (
              <BotCard>
                {/* @ts-expect-error */}
                <Stock props={tool.result} />
              </BotCard>
            ) : tool.toolName === 'showStockPurchase' ? (
              <BotCard>
                {/* @ts-expect-error */}
                <Purchase props={tool.result} />
              </BotCard>
            ) : tool.toolName === 'getEvents' ? (
              <BotCard>
                {/* @ts-expect-error */}
                <Events props={tool.result} />
              </BotCard>
            ) : null
          })
        ) : message.role === 'user' ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === 'assistant' &&
          typeof message.content === 'string' ? (
          <BotMessage content={message.content} />
        ) : null
    }))
}
