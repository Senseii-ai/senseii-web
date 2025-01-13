import { Separator } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { GoalProgress } from "./goal.progress";
import { CurveChart } from "./line-chart";
import { LinearChart } from "./double.linearchart";
import MealPlan from "./meal.plan";

export default function Overview() {
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-semibold">Goal Name</h1>

      <div className="md:grid grid-cols-4 gap-x-2 flex flex-col gap-y-2">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>
              Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Separator className="my-4" />
            <p className="col-span-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis posuere ipsum, quis tempor lacus. Nulla ac quam tempus, feugiat quam eget, viverra nisl. Donec malesuada risus et molestie venenatis. Vestibulum quis dui felis. Integer diam nisl, vestibulum vel quam ac, dapibus malesuada erat. Vivamus pretium sem quis arcu vulputate, a blandit purus aliquam. Etiam mattis scelerisque enim sit amet tempus. Mauris at bibendum nisl.
            </p>
          </CardContent>
        </Card>
        <GoalProgress showFooter={false} />
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
