'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { Chat } from '@/lib/types'
import { BaseURL } from '@/lib/api/http'
import { Session } from 'next-auth'
import { infoLogger } from '@/lib/logger/logger'
import { IChat } from '@senseii/types'
import { userAPI } from '@/lib/api/user/users'
import { AppMessageFromOAIMesssage } from '@/lib/chat/actions'

export async function getChats(sess?: Session | null) {
  infoLogger({ message: `getting chats for ${sess}` })
  const session = (await auth()) as Session

  if (!sess) {
    return []
  }

  if (sess?.user?.email !== session?.user?.email) {
    return {
      error: 'Unauthorized'
    }
  }

  const data = await userAPI.getUserChats(sess)
  return data
}

/**
 * getChat returns the messages for a chat Id.
 */
export async function getChat(id: string, email: string) {
  const session = await auth()

  if (email !== session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  // TODO: replace fetch with axios.
  const response = await userAPI.getChatMessages(session, id)
  if (!response) {
    return null
  }

  const serverMessages = response.messages.map(AppMessageFromOAIMesssage)
  const finalResponse = {
    ...response,
    messages: serverMessages
  }

  return finalResponse
}

// TODO: Implement remove a single chat functionality.
export async function removeChat({ id, path }: { id: string; path: string }) {
  const session = await auth()

  if (!session) {
    return {
      error: 'Unauthorized'
    }
  }

  // Convert uid to string for consistent comparison with session.user.id
  // const uid = String(await kv.hget(`chat:${id}`, 'userId'))

  // if (uid !== session?.user?.id) {
  //   return {
  //     error: 'Unauthorized'
  //   }
  // }

  // await kv.del(`chat:${id}`)
  // await kv.zrem(`user:chat:${session.user.id}`, `chat:${id}`)

  revalidatePath('/')
  return revalidatePath(path)
}

// TODO: Implement clear chat functionality
export async function clearChats() {
  // const session = await auth()
  //
  // if (!session?.user?.id) {
  //   return {
  //     error: 'Unauthorized'
  //   }
  // }
  //
  // const chats: string[] = await kv.zrange(`user:chat:${session.user.id}`, 0, -1)
  // if (!chats.length) {
  //   return redirect('/')
  // }
  // const pipeline = kv.pipeline()
  //
  // for (const chat of chats) {
  //   pipeline.del(chat)
  //   pipeline.zrem(`user:chat:${session.user.id}`, chat)
  // }
  //
  // await pipeline.exec()

  revalidatePath('/')
  return redirect('/')
}

// export async function getSharedChat(id: string) {
//   const chat = await kv.hgetall<Chat>(`chat:${id}`)
//
//   if (!chat || !chat.sharePath) {
//     return null
//   }
//
//   return chat
// }

// TODO: Implement the share chat functionality.
export async function shareChat(id: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  // const chat = await kv.hgetall<Chat>(`chat:${id}`)

  // if (!chat || chat.userId !== session.user.id) {
  //   return {
  //     error: 'Something went wrong'
  //   }
  // }
  //
  const payload = {
    // ...chat,
    sharePath: `/share/${'test'}`
  }

  // await kv.hmset(`chat:${chat.id}`, payload)

  return payload
}

export async function refreshHistory(path: string) {
  redirect(path)
}

// TODO: use this function in right places.
export async function getMissingKeys() {
  const keysRequired = ['OPENAI_API_KEY']
  return keysRequired
    .map(key => (process.env[key] ? '' : key))
    .filter(key => key !== '')
}
