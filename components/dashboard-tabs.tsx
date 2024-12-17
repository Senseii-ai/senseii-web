import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Movement from "./dashboard/movement";
import Meals from "./dashboard/meal";
import MealPlan from "./dashboard/meal-plan";
import WorkOutPlan from "./dashboard/workout-plan";

export default function TabComponent() {
  return (
    <Tabs defaultValue="today" className="space-y-5">
      <TabsList>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="plans">Plans</TabsTrigger>
      </TabsList>
      <TabsContent value="today" className="md:grid flex flex-col grid-cols-4 grid-rows-2 space-y-2">
        <div className="grid grid-cols-4 col-span-4 gap-x-2">
          <div className="md:col-span-1 col-span-2">
            <Movement />
          </div>
          <div className="md:col-span-3 col-span-2">
            <Meals />
          </div>
        </div>

        <div className="flex flex-col row-start-2 gap-x-2 gap-y-2 md:grid grid-cols-4 col-span-4">
          <div className="col-span-2">
            <WorkOutPlan />
          </div>
          <div className="col-span-2">
            <MealPlan />
          </div>
        </div>



      </TabsContent>
      <TabsContent value="overview" className="">
        Overall progress of the goal
      </TabsContent>
      <TabsContent value="plans">
        Plans to be followed by the user.
      </TabsContent>
    </Tabs>
  )
}
