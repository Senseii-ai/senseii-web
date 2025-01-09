import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@/auth'
// import { getMissingKeys } from '@/app/actions'
import { Chat } from '@/components/chat'
import { AI, ServerMessage } from '@/lib/chat/actions'
import { getChat } from '@/app/actions'
import { Session } from 'next-auth'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const session = (await auth()) as Session

  if (!session?.user) {
    return {}
  }

  const chat = await getChat(params.id, session?.user?.email as string)

  if (!chat || 'error' in chat) {
    console.log("GENERATE METADATA FUCKED", chat)
    redirect('/anotherfuck')
  } else {
    return {
      title: "CHECK meta error"
      // title: chat.messages[0].content.toString().slice(0, 50) ?? 'Chat'
    }
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = (await auth()) as Session
  const missingKeys: string[] = []

  if (!session?.user) {
    redirect(`/login?next=/chat/${params.id}`)
  }

  const email = session.user.email as string
  const chat = await getChat(params.id, email)

  if (!chat || 'error' in chat) {
    console.log("chat page error", chat)
    console.log("CHAT PAGE FUCKED")
    redirect('/fuck')
    // } else {
    //   if (chat.id !== session.user.) {
    //     notFound()
    //   }
  }

  return (
    <AI initialAIState={{ chatId: params.id, messages: chat.messages as ServerMessage[] }}>
      <Chat
        id={chat.id}
        session={session}
        initialMessages={chat.messages as ServerMessage[]}
        missingKeys={missingKeys}
      />
    </AI>
  )
}
