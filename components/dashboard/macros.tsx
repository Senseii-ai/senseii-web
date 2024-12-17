import { CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import DashboardCardWrapper from "./card-wrapper";
import { GoPlusCircle } from "react-icons/go";

export default function Macros() {
  return (
    <DashboardCardWrapper showFooter={false} showAddButton={false} icon={<GoPlusCircle />} headerTitle={"Macros"} footerText={"movement so far"}>
      <div className="flex h-32 justify-between items-center space-x-4">
        <ProgressItem title="Protein" value={48} goal={20000} />
        <Separator orientation="vertical" />
        <ProgressItem title="Protein" value={48} goal={20000} />
        <Separator orientation="vertical" />
        <ProgressItem title="Carbs" value={48} goal={20000} />
      </div>
    </DashboardCardWrapper>
  )
}

interface ProgressItemsProps {
  title: string
  icon?: React.ReactNode
  value: number
  goal: number
}

function ProgressItem({ title, icon, value, goal }: ProgressItemsProps) {
  return (
    <div className="space-y-2">
      <CardTitle>{title}</CardTitle>
      <div className="flex justify-between">
        <div className="flex flex-col gap-x-2">
          <h3 className="font-semibold text-lg">{value}</h3>
          <p>Goal {goal}</p>
        </div>
      </div>
      <Progress value={value} />
    </div>
  )
}
