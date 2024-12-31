import { Session } from 'next-auth'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { signOut } from '@/auth'
import Link from 'next/link'

export interface UserMenuProps {
  user: Session['user']
}

// TODO: Currently user name is displayed using email. make it more modular
function getUserInitials(email: string) {
  // const [firstName, lastName] = name.split(' ')
  // return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
  const nameArr = email.split("")
  return nameArr.slice(0, 2).join("")
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="pl-0">
            <div className="flex size-7 shrink-0 select-none items-center justify-center rounded-full bg-muted/50 text-xs font-medium uppercase text-muted-foreground">
              {getUserInitials(user.email as string)}
            </div>
            <span className="ml-2 hidden md:block">{user.email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-fit">
          <Link href={"dashboard"}>
            <DropdownMenuItem className="flex-col items-start">
              <div className="text-xs text-zinc-500">{user.email}</div>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <form
            action={async () => {
              'use server'
              await signOut()
            }}
          >
            <button className=" relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors hover:bg-red-500 hover:text-white focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              Sign Out
            </button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
