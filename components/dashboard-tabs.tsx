import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Movement from "./dashboard/movement";
import Meals from "./dashboard/meal";

export default function TabComponent() {
  return (
    <Tabs defaultValue="today" className="space-y-5">
      <TabsList>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="plans">Plans</TabsTrigger>
      </TabsList>
      <TabsContent value="today" className="md:grid flex flex-col grid-cols-4 space-x-2">
        <div className="col-span-1">
          <Movement />
        </div>
        <div className="col-span-3">
          <Meals />
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
