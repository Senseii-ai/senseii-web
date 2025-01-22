import { getAuth } from "@clerk/remix/ssr.server";
import { json, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { IChat, serverMessage } from "@senseii/types";
import { z } from "zod";
import { ChatList } from "~/components/ui/chat/message.list";
import PromptForm from "~/components/ui/chat/prompt.form";
import { BE_ROUTES, httpGet, httpPost } from "~/lib/http";
import invariant from "tiny-invariant";
import React from "react";
import { BotMessage } from "~/components/ui/chat/message";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useScrollAnchor } from "~/hooks/use-scroll-anchor";
import { Button } from "~/components/ui/button";
import { IoIosArrowRoundDown } from "react-icons/io";
import { LoadingSpinner } from "~/components/ui/spinner";

// FIX: Add unique id as well.
export type ServerMessage = z.infer<typeof serverMessage>;

export async function loader(args: LoaderFunctionArgs) {
  invariant(args.params.chatId, "Expected params.chatId");
  const { getToken } = await getAuth(args);
  const token = await getToken();
  const chats = await httpGet<IChat>(
    BE_ROUTES.getChats(args.params.chatId),
    token as string
  );
  if (!chats.success) {
    return json({
      error: chats.error,
      messages: null,
      title: null,
    });
  }

  return json({
    error: null,
    messages: chats.data.messages,
    title: chats.data.title,
  });
}

// component handling the chat interaction
export async function action(args: ActionFunctionArgs) {
  const { getToken } = await getAuth(args);
  const token = await getToken();
  const { chatId } = args.params;
  const formData = await args.request.formData();
  const chats = formData.get("chats");
  const response = await httpPost<null>(
    BE_ROUTES.saveChat(chatId as string),
    token as string,
    { chats }
  );
  if (!response.success) {
    // FIX: maybe this needs to be a toast.
    console.error("unable to save chat State");
  }
  // FIX: maybe I don't need to refresh the page.
  // return redirect(`chat/${chatId}`)
  return null;
}

export default function Chat() {
  const { messages, title } = useLoaderData<typeof loader>();
  const [chatMessages, setChatMessages] = React.useState<ServerMessage[]>(
    messages || []
  );
  const [streamedMessage, setStreamedMessage] = React.useState<string | null>(
    null
  );
  const [aiState, setAIState] = React.useState("thinking")
  const { chatId } = useParams();

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } = useScrollAnchor()
  return (
    <div className="w-full mt-20 bg-background">
      <div className="fixed z-10 top-0 w-full h-14 items-center bg-background flex justify-center">
        <h6>{title || "Chat with Senseii"}</h6>
      </div>
      <div ref={scrollRef} className="overflow-auto max-h-[calc(100vh-10rem)]">
        <div ref={messagesRef}>
          {chatMessages ? (
            <div
              className={` ${!streamedMessage && "md:pb-40 pb-20"
                } mx-5 overflow-auto `}
            >
              <ChatList messages={chatMessages} />
            </div>
          ) : (
            null
          )}
          {streamedMessage && (
            <div className="relative mx-auto max-w-2xl">
              <Separator className="my-4" />
              <div className="flex gap-x-2">
                <LoadingSpinner />
                <p className="text-sm">
                  {aiState}
                </p>
              </div>
              <BotMessage className="max-w-2xl" content={streamedMessage} />
            </div>
          )}
        </div>
        <div className="mt-5" ref={visibilityRef} />
      </div>

      <div className="fixed inset-x-0 bottom-0 w-full mx-auto max-w-2xl sm:px-4">
        <div className="mx-auto sm:max-w-2xl sm:px-4">
          <div className="space-y-4 border-t bg-background px-4 py-3 shadow-lg sm:rounded-t-xl sm:border md:py-4">
            <PromptForm
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
              setStreamedMessage={setStreamedMessage}
              chatId={chatId as string}
              setAIState={setAIState}
            />
          </div>
        </div>
      </div>

      {/* Scroll to Bottom Button */}
      {!isAtBottom && (
        <Button
          size={"icon"}
          variant={"outline"}
          className="fixed bottom-24 right-4 shadow-lg"
          onClick={scrollToBottom}
        >
          <IoIosArrowRoundDown />
        </Button>
      )}
    </div>
  );
}
