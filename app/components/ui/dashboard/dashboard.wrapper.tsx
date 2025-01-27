import { toast } from "~/hooks/use-toast"
// import { toast } from "~/hooks/use-toast"
// import { toast } from "sonner"
import { Card, CardContent, CardFooter, CardHeader } from "../card"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip"

interface DashboardCardWrapperProps {
  headerTitle: string,
  children: React.ReactNode
  icon: React.ReactNode
  footerText: string
  showAddButton: boolean
  showFooter: boolean
}
export default function DashboardCardWrapper({ showFooter, showAddButton, headerTitle, children, footerText, icon }: DashboardCardWrapperProps) {
  return (
    <Card className="w-full h-full flex flex-col justify-between">
      <CardHeader className="">
        <div className="flex justify-between">
          <h3 className="text-base font-semibold">{headerTitle}</h3>
          {showAddButton ?
            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={() => toast({ description: "We do not support this feature as of now." })} className="text-3xl cursor-pointer font-light">
                  {icon}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                Track your daily {headerTitle} in natural language.
              </TooltipContent>
            </Tooltip> : ""}
        </div>
      </CardHeader>
      <CardContent className="h-full">
        {children}
      </CardContent>
      {showFooter &&
        <CardFooter>
          <p className="text-sm text-muted-foreground">{footerText}</p>
        </CardFooter>}
    </Card >
  )
}
