import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../chart"

const chartData = [
  {
    month: "January",
    calories: 186
  },

  {
    month: "February",
    calories: 305
  },

  {
    month: "March",
    calories: 237
  },

  {
    month: "April",
    calories: 73
  },

  {
    month: "May",
    calories: 209
  },

  {
    month: "June",
    calories: 214
  },
]

const chartConfig = {
  calories: {
    label: "Calories",
    color: "hsl(var(--chart-2))",
  }
} satisfies ChartConfig

interface LineChartProps {
  title: string
}

export function CurveChart({ title }: LineChartProps) {
  return (
    <Card className="relative">
      <div className="absolute opacity-95 items-center flex p-0 inset-x-0 w-full justify-center h-full">Real Time progress tracking coming soon.</div>
      <div className="opacity-10">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="calories"
                type="natural"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
