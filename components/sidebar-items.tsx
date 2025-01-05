'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { removeChat } from '@/app/actions'
import { SidebarActions } from '@/components/sidebar-actions'
import { SidebarItem } from '@/components/sidebar-item'
import { IChat } from '@senseii/types'

interface SidebarItemsProps {
  chats?: IChat[]
}

export function SidebarItems({ chats }: SidebarItemsProps) {
  if (!chats?.length) return null

  return (
    <AnimatePresence>
      {chats.map(
        (chat, index) =>
          chat && (
            <motion.div
              key={chat?.id}
              className='flex justify-between'
              exit={{
                opacity: 0,
                height: 0
              }}
            >
              <SidebarItem index={index} chat={chat} />
              <SidebarActions chat={chat} removeChat={removeChat} />
            </motion.div>
          )
      )}
    </AnimatePresence>
  )
}
