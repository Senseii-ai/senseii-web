import { Button } from "../button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip"
import { Textarea } from "../textarea"
import { IconArrowElbow } from "../icons/icons"
import { useEnterSubmit } from "~/hooks/use-enter-submit"
import React from "react"
import { Form, useSubmit } from "@remix-run/react"

export function action() {
  console.log("I was submitted")
}

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
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden pr-14 pl-0 sm:rounded-md sm:border sm:pl-0">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div className="absolute right-0 top-[9px] sm:right-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" className="size-12" disabled={input === ''}>
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


