import { toast } from "~/hooks/use-toast"
// import { toast } from "~/hooks/use-toast"
// import { toast } from "sonner"
import { Card, CardContent, CardFooter, CardHeader } from "../card"

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
    <Card className="w-full h-full md:max-h-20 flex flex-col justify-between">
      <CardHeader>
        <div className="flex justify-between">
          <h3 className="text-base font-semibold">{headerTitle}</h3>
          {showAddButton ? <button onClick={() => toast({ description: "implement chat modal" })} className="text-3xl cursor-pointer font-light">{icon}</button> : ""}

        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showFooter &&
        <CardFooter>
          <p>{footerText}</p>
        </CardFooter>}
    </Card >
  )
}
