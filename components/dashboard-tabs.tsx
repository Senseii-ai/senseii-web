import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Movement from "./dashboard/movement";
import Meals from "./dashboard/meal";
import Overview from "./dashboard/overview";
import DailyMealPlan from "./dashboard/daily-meal-plan";

export default function TabComponent() {
  return (
    <Tabs defaultValue="today" className="space-y-5">
      <TabsList>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="overview">Overview</TabsTrigger>
      </TabsList>
      <TabsContent value="today" className="md:grid flex flex-col grid-cols-4 space-y-2">
        <div className="grid grid-cols-4 col-span-4 gap-x-2">
          <div className="md:col-span-1 col-span-2">
            <Movement available={false} />
          </div>
          <div className="md:col-span-3 col-span-2">
            <Meals available={false} />
          </div>
        </div>
        <div className="col-span-4 space-y-2">
          <DailyMealPlan isAvailable={true} />
        </div>
      </TabsContent>
      <TabsContent value="overview" className="">
        <Overview />
      </TabsContent>
    </Tabs>
  )
}
