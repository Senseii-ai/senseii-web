'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { BaseUrl, Chat } from '@/lib/types'
import { httpGet } from '@/lib/api/http'

export async function getChats(userId?: string | null) {
  const session = await auth()

  if (!userId) {
    return []
  }

  if (userId !== session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  try {
    const url = `${BaseUrl}/chat/user/${userId}/chats`
    const { data } = await httpGet(url)
    return data as Chat[]
  } catch (error) {
    return []
  }
}

export async function getChat(id: string, userId: string) {
  const session = await auth()

  if (userId !== session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  const url = `${BaseUrl}/chat/user/${userId}/chat/${id}`
  const { data } = await httpGet(url)

  if (!data || (userId && data.userId !== userId)) {
    return null
  }
  return data
}

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

export async function getMissingKeys() {
  const keysRequired = ['OPENAI_API_KEY']
  return keysRequired
    .map(key => (process.env[key] ? '' : key))
    .filter(key => key !== '')
}
