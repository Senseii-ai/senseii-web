import { Progress } from "../progress";
import { Separator } from "../separator";
import { GoPlusCircle } from "react-icons/go";
import DashboardCardWrapper from "./dashboard.wrapper";

export default function Macros() {
  return (
    <DashboardCardWrapper showFooter={false} showAddButton={false} icon={<GoPlusCircle />} headerTitle={"Macros"} footerText={"movement so far"}>
      <div className="flex h-32 items-center w-full">
        <div className="h-full flex w-full md:pl-5">
          <ProgressItem title="Protein" value={48} goal={20000} />
          {/* <Separator orientation="vertical" /> */}
        </div>

        <div className="h-full flex w-full">
          <Separator orientation="vertical" className="mr-5" />
          <ProgressItem title="Protein" value={48} goal={20000} />
        </div>

        <div className="flex h-full w-full">
          <Separator orientation="vertical" className="mr-5" />
          <ProgressItem title="Carbs" value={48} goal={20000} />
        </div>
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

function ProgressItem({ title, value, goal }: ProgressItemsProps) {
  return (
    <div className="space-y-2">
      <h6>{title}</h6>
      <div className="flex justify-between">
        <div className="flex flex-col gap-x-2 gap-y-4">
          <h6 className="">{value}</h6>
          <div>
            <p className="text-xs">Goal</p>
            <h6>{goal}</h6>
          </div>
        </div>
      </div>
      <Progress value={value} />
    </div>
  )
}
