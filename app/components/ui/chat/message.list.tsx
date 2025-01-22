import { ServerMessage } from "~/routes/chat.$chatId";
import { Separator } from "../separator";
import { BotMessage, UserMessage } from "./message";

export interface ChatList {
  messages: ServerMessage[];
}

export function ChatList({ messages }: ChatList) {
  return (
    <div className="relative mx-auto max-w-2xl">
      {messages.map((message, index) => (
        <div key={message.id}>
          {message.role === "user" ? (
            <UserMessage>{message.content}</UserMessage>
          ) : (
            <BotMessage content={message.content} />
          )}
          {index < messages.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  );
}
