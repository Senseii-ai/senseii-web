import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function TabComponent() {
  return (
    <div>
      <Tabs defaultValue="">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="">
          <div className="flex md:flex-row gap-x-2 flex-col">
            <DashboardCard />
            <DashboardCard />
            <DashboardCard />
          </div>
        </TabsContent>
        <TabsContent value="overview" className="">
          <div className="flex md:flex-row flex-col">
            <DashboardCard />
            <DashboardCard />
            <DashboardCard />
          </div>
        </TabsContent>
        <TabsContent value="plans">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}

function DashboardCard() {
  return (
    <Card className="w-full ">
      <CardHeader>
        <div className="flex justify-between">
          <h3>Total Revenue</h3>
          <p>$</p>
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="text-3xl font-bold">$300,000</h1>
      </CardContent>
      <CardFooter>
        <p>+20.1% last month</p>
      </CardFooter>
    </Card>
  )
}
