import { cn } from "~/lib/utils";
import { IconUser } from "../icons/icons";
import { MemoizedReactMarkdown } from "./markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import React from "react";
import { LoadingSpinner } from "../spinner";
import { Separator } from "../separator";
import SenseiiIcon from "./senseii.icon";

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[25px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm">
        <IconUser />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden pl-2">
        {children}
      </div>
    </div>
  );
}

export const AIStateIndicator = ({ aiState }: { aiState: string }) => {
  return (
    <div className="flex items-center gap-x-2">
      <LoadingSpinner />
      <p className="text-base">
        {aiState}
      </p>
    </div>
  )
}

export const StreamingBotMessage = ({
  content,
  className,
  aiState
}: {
  content: string;
  className?: string;
  aiState: string
}) => {
  return (
    <div className={cn("group relative flex items-start md:-ml-12", className)}>
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <SenseiiIcon />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <AIStateIndicator aiState={aiState} />
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
          }}
        >
          {content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}

/**
 * BotMessage returns a Bot Message component.
 * content {string}
*/

export function BotMessage({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={cn("group relative flex items-start md:-ml-12", className)}>
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <SenseiiIcon />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-td:min-w-24 prose-p:leading-snug prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            table({ children }) {
              return (
                <div className="overflow-x-scroll w-full max-w-3xl my-2">
                  <table>{children}</table>
                  <Separator />
                </div>
              )
            },
          }}
        >
          {content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}
