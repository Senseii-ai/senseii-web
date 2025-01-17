import { getAuth } from "@clerk/remix/ssr.server";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IChat, message } from "@senseii/types";
import { z } from "zod";
import { ChatList } from "~/components/ui/chat/message.list";
import PromptForm from "~/components/ui/chat/prompt.form";
import { httpGet } from "~/lib/http";

// FIX: Add unique id as well.
export type ServerMessage = z.infer<typeof message>

export async function loader(args: LoaderFunctionArgs) {
  const { getToken } = await getAuth(args)
  const token = await getToken()
  const chatId = "GvpCJe6"
  const chats = await httpGet<IChat>(`chat/${chatId}`, token as string)
  if (!chats.success) {
    return json({
      error: chats.error,
      messages: null
    })
  }

  return json({
    error: null,
    messages: chats.data.messages
  })
}

// component handling the chat interaction
export function action() {
  console.log("I was called instead")
  return null
}

export default function Chat() {
  const { messages } = useLoaderData<typeof loader>()

  return (
    <div className="w-full mt-10">
      {messages ? (
        <ChatList messages={messages} />
      ) : (
        ""
      )}
      <div className="fixed inset-x-0 bottom-0 w-full mx-auto max-w-2xl sm:px-4">
        <div className="mx-auto sm:max-w-2xl sm:px-4">
          <div className="space-y-4 border-t bg-background px-4 py-3 shadow-lg sm:rounded-t-xl sm:border md:py-4">
            <PromptForm />
          </div>
        </div>
      </div>
    </div>
  )
}
