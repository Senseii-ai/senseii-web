'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { Chat } from '@/lib/types'
import { BaseURL } from '@/lib/api/http'
import { Session } from 'next-auth'

export async function getChats(userId?: string | null) {
  const session = await auth() as Session

  if (!userId) {
    return []
  }

  if (userId !== session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  try {
    const url = `${BaseURL}/chat/user/${userId}/chats`
    console.log("trying to get the chats")
    const response = await fetch(url)
    const { data } = await response.json()
    console.log("DATA", data)
    //FIX: maybe path is going to cause problems.
    return data as Chat[]
  } catch (error) {
    return []
  }
}

/**
 * getChat returns the messages for a chat Id.
*/
export async function getChat(id: string, userId: string) {
  const session = await auth()

  if (userId !== session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  const url = `${BaseURL}/chat/user/${userId}/chat/${id}`
  // TODO: replace fetch with axios.
  const response = await fetch(url)
  const { data } = await response.json()

  if (!data || (userId && data.userId !== userId)) {
    return null
  }
  return data
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
