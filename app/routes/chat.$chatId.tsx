import { getAuth } from "@clerk/remix/ssr.server";
import { json, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { IChat, serverMessage } from "@senseii/types";
import { z } from "zod";
import { ChatList } from "~/components/ui/chat/message.list";
import PromptForm from "~/components/ui/chat/prompt.form";
import { BE_ROUTES, httpGet, httpPost } from "~/lib/http";
import invariant from "tiny-invariant";
import React, { useCallback } from "react";
import { BotMessage } from "~/components/ui/chat/message";
import { Separator } from "@radix-ui/react-dropdown-menu";

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
    });
  }

  return json({
    error: null,
    messages: chats.data.messages,
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
  const { messages } = useLoaderData<typeof loader>();
  const [chatMessages, setChatMessages] = React.useState<ServerMessage[]>(
    messages || []
  );
  const [streamedMessage, setStreamedMessage] = React.useState<string | null>(
    null
  );
  const { chatId } = useParams();

  const memoizedSetStreamedMessage: React.Dispatch<
    React.SetStateAction<string | null>
  > = useCallback((value) => {
    setStreamedMessage(value);
  }, []);

  return (
    <div className="w-full mt-10 bg-background">
      <div className="flex justify-center">
        <h6>Your Goal</h6>
      </div>
      {chatMessages ? (
        <div className={` ${!streamedMessage && "pb-40"} mx-5`}>
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
            <PromptForm
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
              setStreamedMessage={memoizedSetStreamedMessage}
              chatId={chatId as string}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
