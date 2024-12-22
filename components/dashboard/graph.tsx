"use client"

import { Bar, BarChart } from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { desktop: 1 },
  { desktop: 2 },
  { desktop: 4 },
  { desktop: 3 },
  { desktop: 2 },
  { desktop: 4 },
  { desktop: 5 },
  { desktop: 6 },
  { desktop: 7 },
  { desktop: 8 },
  { desktop: 9 },
  { desktop: 12 },
  { desktop: 9 },
  { desktop: 10 },
  { desktop: 11 },
  { desktop: 13 },
  { desktop: 6 },
  { desktop: 7 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
  },
} satisfies ChartConfig

export function Graph() {
  return (
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

