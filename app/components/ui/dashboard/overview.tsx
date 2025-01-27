import { Separator } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { GoalProgress } from "./goal.progress";
import { CurveChart } from "./line-chart";
import { LinearChart } from "./double.linearchart";
import MealPlan from "./meal.plan";

interface OverviewProps {
  description: string
  progress: number
}

export default function Overview({ description, progress }: OverviewProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-semibold">Goal Name</h1>

      <div className="md:grid grid-cols-4 gap-x-2 flex flex-col gap-y-2">
        <Card className="lg:col-span-3 col-span-2">
          <CardHeader>
            <CardTitle>
              Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Separator className="my-4" />
            <p className="col-span-3">
              {description}
            </p>
          </CardContent>
        </Card>
        <div className="lg:col-span-1 col-span-2 h-full">
          <GoalProgress showFooter={false} progress={progress} />
        </div>
      </div>

      <div className="md:grid grid-cols-4 flex flex-col gap-x-2 gap-y-2">
        <div className="col-span-2">
          <CurveChart title="Descipline" />
        </div>
        <div className="col-span-2">
          <LinearChart title="Weight" />
        </div>
      </div>

      <MealPlan isAvailable={true} />
      {/* TODO: Add workout plans here */}
      {/* <WorkoutPlan title="Workout Plan" isAvailable={true} /> */}
    </div >
  )
}
