import { Button } from "../button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip"
import { Textarea } from "../textarea"
import { IconArrowElbow } from "../icons/icons"
import { useEnterSubmit } from "~/hooks/use-enter-submit"
import React, { Dispatch, SetStateAction } from "react"
import { Form, useSubmit } from "@remix-run/react"
import { ServerMessage } from "~/routes/chat.$chatId"
import { useAuth } from "@clerk/remix"
import { StreamMessage } from "@senseii/types"
import { nanoid } from "nanoid"

interface PromptFormProps {
  chatMessages: ServerMessage[],
  setChatMessages: Dispatch<SetStateAction<ServerMessage[]>>
  setStreamedMessage: Dispatch<SetStateAction<string | null>>,
  chatId: string
}

export default function PromptForm({ setChatMessages, setStreamedMessage, chatId }: PromptFormProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const [input, setInput] = React.useState("")
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const { getToken } = useAuth()
  const submit = useSubmit()

  return (
    <Form ref={formRef} method="post" onSubmit={async (e) => {
      e.preventDefault()

      const token = await getToken()
      if (!token) {
        submit(e.currentTarget)
      }

      const value = input.trim()
      setInput('')
      if (!value) return


      setChatMessages((prev) => [...prev, { role: "user", id: nanoid(), content: input }])
      const streamChatURL = `${window.ENV.BACKEND_URL}/chat`

      const response = await fetch(streamChatURL, {
        method: "POST",
        body: JSON.stringify({ content: value, chatId: chatId }),
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      setStreamedMessage("")

      let realTimeStreamedMessage = ""

      if (response.ok) {
        const reader = response?.body?.getReader()

        if (!reader) {
          console.error("internal server error")
          return
        }

        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            break
          }

          const chunk = decoder.decode(value)
          // console.log("chunk received", chunk, "end")

          try {
            const lines = chunk.split("\n")
            // console.log("lines in chunk", lines, "end")
            // let data = ""
            lines.forEach((line) => {
              if (line.startsWith("data")) {

                // console.log("line is", line, "end")
                const data = line.replace("data: ", "").trim()

                // console.log("just before parsing", data, "end")
                if (data) {
                  const parsed: StreamMessage = JSON.parse(data)

                  // console.log("PARSED DATA", parsed)
                  if (parsed.type === "content") {
                    realTimeStreamedMessage += parsed.content
                    setStreamedMessage((prev) => prev + parsed.content)
                  }
                }
              }
            })

          } catch (error) {
            console.error("Error parsing chunk", error)
          }
        }

        setChatMessages((prev) => [
          ...prev, { role: "assistant", id: nanoid(), content: realTimeStreamedMessage }
        ])
        setStreamedMessage(null)

        const chats: ServerMessage[] = [
          {
            id: nanoid(),
            role: "user",
            content: value
          },
          {
            id: nanoid(),
            role: "assistant",
            content: realTimeStreamedMessage
          }
        ]

        // FIX: save the messages in the database.
        submit({ chats: JSON.stringify({ chats: chats }) }, { method: "post" })
      }
      // Use Remix's useSubmit to programmatically submit the form
    }
    }>
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
          onChange={e => setInput(e.target.value)}
        />
        <div className="absolute right-0 sm:top-0 top-[1px] sm:right-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" className="size-16" disabled={input === ''}>
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </Form>
  )
}
