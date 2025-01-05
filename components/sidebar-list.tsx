import { clearChats, getChats } from '@/app/actions'
import { ClearHistory } from '@/components/clear-history'
import { SidebarItems } from '@/components/sidebar-items'
import { ThemeToggle } from '@/components/theme-toggle'
import { infoLogger } from '@/lib/logger/logger'
import { Session } from 'next-auth'
import { redirect } from 'next/navigation'
import { cache } from 'react'

interface SidebarListProps {
  sess?: Session
  children?: React.ReactNode
}

const loadChats = cache(async (sess?: Session) => {
  infoLogger({ message: "loading user chats", status: "INFO", name: "SideBarList" })
  const chats = await getChats(sess)
  infoLogger({ message: "chats loaded successfully", status: "success", name: "SideBarList" })
  return chats
})

export async function SidebarList({ sess }: SidebarListProps) {
  const chats = await loadChats(sess)

  if (!chats || 'error' in chats) {
    redirect('/')
  } else {
    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          {chats?.length ? (
            <div className="space-y-2 px-2">
              <SidebarItems chats={chats} />
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm text-muted-foreground">No chat history</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between p-4">
          <ThemeToggle />
          <ClearHistory clearChats={clearChats} isEnabled={chats?.length > 0} />
        </div>
      </div>
    )
  }
}
