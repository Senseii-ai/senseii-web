import DailyMealPlan from "./daily.meal.plan";
import Meals from "./meals";
import Movement from "./movement";
import Overview from "./overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

export default function TabComponent() {
  return (
    <Tabs defaultValue="today" className="space-y-5">
      <TabsList>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="overview">Overview</TabsTrigger>
      </TabsList>

      {/* Everyday Updates */}
      <TabsContent value="today" className="md:grid flex flex-col grid-cols-4 space-y-2">
        <div className="md:grid grid-cols-4 flex flex-col gap-y-4 col-span-4 gap-x-2">
          <div className="md:col-span-1 col-span-2">
            <Movement available={true} />
          </div>
          <div className="md:col-span-3 col-span-2">
            <Meals available={true} />
          </div>
        </div>
        <div className="col-span-4 space-y-2">
          <DailyMealPlan isAvailable={true} />
        </div>
      </TabsContent>

      {/* Overview of the Goal */}
      <TabsContent value="overview" className="">
        <Overview />
      </TabsContent>
    </Tabs>
  )
}
