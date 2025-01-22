import React, { Dispatch, FormEvent, SetStateAction, useCallback } from "react";
import { Form, useSubmit } from "@remix-run/react";
import { useAuth } from "@clerk/remix";
import { nanoid } from "nanoid";
import { Button } from "../button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import { Textarea } from "../textarea";
import { IconArrowElbow } from "../icons/icons";
import { useEnterSubmit } from "~/hooks/use-enter-submit";
import { ServerMessage } from "~/routes/chat.$chatId";
import { StateChangeMessage, StreamMessage } from "@senseii/types";

interface PromptFormProps {
  chatMessages: ServerMessage[];
  setChatMessages: Dispatch<SetStateAction<ServerMessage[]>>;
  setStreamedMessage: Dispatch<SetStateAction<string | null>>;
  chatId: string;
  setAIState: Dispatch<SetStateAction<string>>
}

const PromptForm = React.memo(
  ({ setChatMessages, setStreamedMessage, chatId, setAIState }: PromptFormProps) => {
    const { formRef, onKeyDown } = useEnterSubmit();
    const [input, setInput] = React.useState("");
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const { getToken } = useAuth();
    const submit = useSubmit();

    const handleSubmit = useCallback(
      async (e: FormEvent<HTMLElement>) => {
        e.preventDefault();

        const token = await getToken();
        if (!token) {
          submit({ method: "post" });
        }

        const value = input.trim();
        setInput("");
        if (!value) return;

        setChatMessages((prev) => [
          ...prev,
          { role: "user", id: nanoid(), content: input },
        ]);
        setStreamedMessage(""); // start streaming

        const streamChatURL = `${window.ENV.BACKEND_URL}/chat`;

        const response = await fetch(streamChatURL, {
          method: "POST",
          body: JSON.stringify({ content: value, chatId: chatId }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        let realTimeStreamedMessage = "";
        let realTimeState = ""

        if (response.ok) {
          const reader = response?.body?.getReader();

          if (!reader) {
            console.error("internal server error");
            return;
          }

          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }

            const chunk = decoder.decode(value);

            try {
              const lines = chunk.split("\n");
              lines.forEach((line) => {
                if (line.startsWith("data")) {
                  const data = line.replace("data: ", "").trim();
                  console.log('data', data)
                  if (data) {
                    const parsed: StreamMessage = JSON.parse(data);
                    if (parsed.type === "content") {
                      realTimeStreamedMessage += parsed.content;
                      setStreamedMessage((prev) => prev + parsed.content);
                    }
                  }
                } else if (line.startsWith("event")) {
                  const data = line.replace("event: ", "").trim()
                  if (data) {
                    const parsed: StateChangeMessage = JSON.parse(data)
                    realTimeState = parsed.content
                    console.log(realTimeState)
                    setAIState(realTimeState)
                  }
                }
              });
            } catch (error) {
              console.error("Error parsing chunk", error);
            }
          }

          setChatMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              id: nanoid(),
              content: realTimeStreamedMessage,
            },
          ]);
          setStreamedMessage(null);

          const chats: ServerMessage[] = [
            {
              id: nanoid(),
              role: "user",
              content: value,
            },
            {
              id: nanoid(),
              role: "assistant",
              content: realTimeStreamedMessage,
            },
          ];

          submit(
            { chats: JSON.stringify({ chats: chats }) },
            { method: "post" }
          );
        }
      },
      [input, setChatMessages, setStreamedMessage, chatId, getToken, submit]
    );

    return (
      <Form ref={formRef} method="post" onSubmit={handleSubmit}>
        <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden pr-20 sm:rounded-md sm:border sm:pl-0">
          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            placeholder="Send a message."
            className="min-h-[60px] w-full resize-none outline-purple-500 focus-within:border-none bg-transparent px-4 py-[1.3rem] sm:text-sm  ring-inset focus:ring-2"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            name="message"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="absolute right-0 sm:top-0 top-[1px] sm:right-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  size="icon"
                  className="size-16"
                  disabled={input === ""}
                >
                  <IconArrowElbow />
                  <span className="sr-only">Send message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </Form>
    );
  }
);

PromptForm.displayName = "PromptForm";
export default PromptForm;
