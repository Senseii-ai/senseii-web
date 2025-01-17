import { ServerMessage } from '~/routes/chat.$chatId'
import { Separator } from '../separator'
import { BotMessage, UserMessage } from './message'

export interface ChatList {
  messages: ServerMessage[]
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null
  }
  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {/* {!isShared && !session ? ( */}
      {/*   <> */}
      {/*     <div className="group relative mb-4 flex items-start md:-ml-12"> */}
      {/*       <div className="bg-background flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border shadow-sm"> */}
      {/*         <ExclamationTriangleIcon /> */}
      {/*       </div> */}
      {/*       <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1"> */}
      {/*         <p className="text-muted-foreground leading-normal"> */}
      {/*           Please{' '} */}
      {/*           <Link href="/login" className="underline"> */}
      {/*             log in */}
      {/*           </Link>{' '} */}
      {/*           or{' '} */}
      {/*           <Link href="/signup" className="underline"> */}
      {/*             sign up */}
      {/*           </Link>{' '} */}
      {/*           to save and revisit your chat history! */}
      {/*         </p> */}
      {/*       </div> */}
      {/*     </div> */}
      {/*     <Separator className="my-4" /> */}
      {/*   </> */}
      {/* ) : null} */}

      {messages.map((message, index) => (
        <div key={message.content}>
          {message.role === "user" ? <UserMessage>{message.content}</UserMessage> : <BotMessage content={message.content}></BotMessage>}
          {index < messages.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  )
}

