import PromptForm from "~/components/ui/chat/prompt.form";

export function action() {
  console.log("I was called instead")
  return null
}

export default function Chat() {
  return (
    <div className="w-full">
      This is chat function
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
