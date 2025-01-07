import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@/auth'
// import { getMissingKeys } from '@/app/actions'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { getChat } from '@/app/actions'
import { Session } from 'next-auth'

export interface ChatPageProps {
  params: {
    id: string
  }
}

// export async function generateMetadata({
//   params
// }: ChatPageProps): Promise<Metadata> {
//   const session = (await auth()) as Session
//
//   if (!session?.user) {
//     return {}
//   }
//
//   const chat = await getChat(params.id, session?.user?.id as string)
//
//   if (!chat || 'error' in chat) {
//     console.log("GENERATE METADATA FUCKED")
//     redirect('/')
//   } else {
//     return {
//       title: chat.messages[0].content.toString().slice(0, 50) ?? 'Chat'
//     }
//   }
// }

export default async function ChatPage({ params }: ChatPageProps) {
  const session = (await auth()) as Session
  // const missingKeys = await getMissingKeys()
  const missingKeys: string[] = []

  if (!session?.user) {
    redirect(`/login?next=/chat/${params.id}`)
  }

  const userId = session.user.id as string
  const chat = await getChat(params.id, userId)

  if (!chat || 'error' in chat) {
    console.log("CHAT PAGE FUCKED")
    redirect('/')
  } else {
    if (chat.email !== session.user.email) {
      notFound()
    }
  }

  return (
    <AI initialAIState={{ chatId: params.id, messages: chat.messages }}>
      <Chat
        id={chat.chatId}
        session={session}
        initialMessages={chat.messages}
        missingKeys={missingKeys}
      />
    </AI>
  )
}
