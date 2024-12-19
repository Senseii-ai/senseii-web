import { FaDumbbell, FaWalking } from "react-icons/fa"
import { CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"
import { GoPlusCircle } from "react-icons/go";
import DashboardCardWrapper from "./card-wrapper";

interface MovementProps {
  available: boolean
}

function MovementNotAvailable() {
  return (<div>
    Press + to enter manually or install App
  </div>)
}

export default function Movement({ available }: MovementProps) {
  return (
    <DashboardCardWrapper showFooter={true} showAddButton={true} icon={<GoPlusCircle />} headerTitle={"Movement"} footerText={"movement so far"}>
      {!available ?
        <MovementNotAvailable /> : <div className="space-y-8">
          <ProgressItem title="steps" icon={<FaWalking />} value={48} goal={20000} />
          <ProgressItem title="Exercise" icon={<FaDumbbell />} value={62} goal={20000} />
        </div>
      }
    </DashboardCardWrapper>
  )
}

interface ProgressItemsProps {
  title: string
  icon?: React.ReactNode
  value: number
  goal: number
}

export function ProgressItem({ title, icon, value, goal }: ProgressItemsProps) {
  return (
    <div className="space-y-2">
      <CardTitle>{title}</CardTitle>
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          <div className="text-2xl">
            {icon}
          </div>
          <h3 className="font-semibold text-lg">{value}</h3>
        </div>
        <p>Goal {goal}</p>
      </div>
      <Progress className="" value={value} />
    </div>
  )
}
