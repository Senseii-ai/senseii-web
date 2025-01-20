import { getAuth } from "@clerk/remix/ssr.server";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { IChat, serverMessage } from "@senseii/types";
import { z } from "zod";
import { ChatList } from "~/components/ui/chat/message.list";
import PromptForm from "~/components/ui/chat/prompt.form";
import { httpGet } from "~/lib/http";
import invariant from "tiny-invariant"
import React from "react";
import { BotMessage } from "~/components/ui/chat/message";
import { Separator } from "@radix-ui/react-dropdown-menu";

// FIX: Add unique id as well.
export type ServerMessage = z.infer<typeof serverMessage>

export async function loader(args: LoaderFunctionArgs) {
  invariant(args.params.chatId, "Expected params.chatId")
  const { getToken } = await getAuth(args)
  const token = await getToken()
  const chats = await httpGet<IChat>(`chat/${args.params.chatId}`, token as string)
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
  const [chatMessages, setChatMessages] = React.useState<ServerMessage[]>(messages || [])
  const [streamedMessage, setStreamedMessage] = React.useState<string | null>("")
  const { chatId } = useParams()

  return (
    <div className="w-full mt-10">
      <div className="flex justify-center">
        <h6>Your Goal</h6>
      </div>
      {chatMessages ? (
        <div className="mb-40">
          <ChatList messages={chatMessages} />
        </div>
      ) : (
        ""
      )}
      {streamedMessage && (
        <div className="relative mx-auto max-w-2xl">
          <Separator className="my-4" />
          <BotMessage className="max-w-2xl" content={streamedMessage} />
        </div>
      )}
      <div className="fixed inset-x-0 bottom-0 w-full mx-auto max-w-2xl sm:px-4">
        <div className="mx-auto sm:max-w-2xl sm:px-4">
          <div className="space-y-4 border-t bg-background px-4 py-3 shadow-lg sm:rounded-t-xl sm:border md:py-4">
            <PromptForm chatMessages={chatMessages} setChatMessages={setChatMessages} setStreamedMessage={setStreamedMessage} chatId={chatId as string} />
          </div>
        </div>
      </div>
    </div>
  )
}
