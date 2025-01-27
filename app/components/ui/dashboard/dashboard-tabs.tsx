import DailyMealPlan from "./daily.meal.plan";
import Meals from "./meals";
import Movement from "./movement";
import Overview from "./overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { Button } from "../button";
import { IconOpenAI } from "../icons/icons";
import { Link } from "@remix-run/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import { UserGoalItem } from "~/routes/_index";

interface TabComponentProps {
  chatId: string
  goals: UserGoalItem[]
}

export default function TabComponent({ chatId, goals }: TabComponentProps) {
  return (
    <div className="relative h-full">
      <div className="absolute top-0 flex gap-x-2 right-0">
        <Tooltip>
          <TooltipTrigger>
            <Link to={`chat/${chatId}`}>
              <Button size={"default"}>
                <IconOpenAI />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              click to chat regarding this goal
            </p>
          </TooltipContent>
        </Tooltip>

      </div>
      <Tabs defaultValue="today" className="space-y-5">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>
        {/* Everyday Updates */}
        <TabsContent value="today" className="h-full bg-background father flex flex-col gap-y-2">
          <div className="md:grid grid-cols-5 grid-rows-1 flex flex-col gap-y-2 h-full w-full gap-x-2">
            <div className="col-span-2 row-span-1">
              {/* Movement */}
              <Movement available={false} />
            </div>
            <div className="col-span-3 h-full row-span-1">
              {/* Nutrition */}
              <Meals available={false} />
            </div>
          </div>
          <div className="h-full">
            {/* Daily meal Plan */}
            <DailyMealPlan plans={goals[0].nutritionPlan} isAvailable={true} />
          </div>
        </TabsContent>

        {/* Overview of the Goal */}
        <TabsContent value="overview" className="h-full">
          <Overview plans={goals[0].nutritionPlan} description={goals[0].description} progress={0} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
