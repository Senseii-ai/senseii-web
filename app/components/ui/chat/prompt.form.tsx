import { Button } from "../button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip"
import { Textarea } from "../textarea"
import { IconArrowElbow } from "../icons/icons"
import { useEnterSubmit } from "~/hooks/use-enter-submit"
import React from "react"
import { Form, useSubmit } from "@remix-run/react"

export default function PromptForm() {
  const { formRef, onKeyDown } = useEnterSubmit()
  const [input, setInput] = React.useState("")
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const submit = useSubmit()

  return (
    <Form ref={formRef} method="post" onSubmit={(e) => {
      e.preventDefault()
      const value = input.trim()
      setInput('')
      if (!value) return

      // Use Remix's useSubmit to programmatically submit the form
      submit(e.currentTarget)
    }}>
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
