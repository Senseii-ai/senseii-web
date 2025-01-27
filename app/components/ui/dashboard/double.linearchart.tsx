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
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../chart"
const chartData = [
  { month: "January", desktop: 111, mobile: 100 },
  { month: "February", desktop: 108, mobile: 90 },
  { month: "March", desktop: 100, mobile: 80 },
  { month: "April", desktop: 90, mobile: 70 },
  { month: "May", desktop: 70, mobile: 60 },
  { month: "June", desktop: 50, mobile: 50 },
  { month: "July", desktop: 22, mobile: 40 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface LinearChartProps {
  title: string
}

export function LinearChart({ title }: LinearChartProps) {
  return (
    <Card className=" relative">
      <div className="absolute opacity-95 items-center flex p-0 inset-x-0 w-full justify-center h-full">Real Time progress tracking coming soon.</div>
      <div className="opacity-10">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="relative">

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
                dataKey="desktop"
                type="linear"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="mobile"
                type="monotone"
                stroke="hsl(var(--primary))"
                strokeWidth={1}
                dot={true}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total progress for the last 6 months
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
