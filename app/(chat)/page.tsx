import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Session } from 'next-auth'
import { infoLogger } from '@/lib/logger/logger'
import { userAPI } from '@/lib/api/user/users'

export const metadata = {
  title: 'Senseii Fitness App'
}

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session
  if (!session) {
    infoLogger({ message: "session not found", status: "failed", layer: "SERVER COMP", name: "IndexPage" })
    redirect('/login')
  }

  const missingKeys: string[] = []

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} session={session} missingKeys={missingKeys} />
    </AI>
  )
}
