'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { Session } from 'next-auth'
import { infoLogger } from '@/lib/logger/logger'
import { userAPI } from '@/lib/api/user/users'
import { AppMessageFromOAIMesssage } from '@/lib/chat/actions'

/**
 * getChats returns are the chats user has had so far with the system.
*/
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
  const session = (await auth()) as Session

  if (email !== session?.user?.email) {
    return {
      error: 'Unauthorized'
    }
  }

  // TODO: replace fetch with axios.
  const response = await userAPI.getChatMessages(session, id)
  if (!response) {
    console.log("API ERROR")
    return null
  }

  return response
}

// TODO: Implement remove a single chat functionality.
export async function removeChat(id: string) {
  const session = await auth()

  if (!session) {
    return {
      error: 'Unauthorized'
    }
  }

  await userAPI.deleteChat(session, id)
  revalidatePath('/')
  // FIX: maybe this can cause issues.
  return revalidatePath(`chat/${id}`)
}

// TODO: Implement clear chat functionality
export async function clearChats(): Promise<void | { error: "Unauthorized" }> {
  const session = await auth()

  if (!session?.user?.email) {
    return {
      error: 'Unauthorized'
    }
  }

  await userAPI.deleteUserChats(session)
  revalidatePath("/")
  return redirect("/")
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
