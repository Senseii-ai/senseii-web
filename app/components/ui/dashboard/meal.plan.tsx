import { Card, CardContent, CardHeader, CardTitle } from "../card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table"
import PlanNotAvailable from "./not.available";
import { DailyNutritionPlan, MacroNutrients, Meals, MicroNutrients, NutritionPlan } from "@senseii/types";


export const dailyMealPlan: DailyNutritionPlan = {
  day: "Monday",
  meals: [
    {
      type: "Breakfast",
      food: "Omellete with 3 eggs",
      macros: {
        protein: 20,
        dietryFat: 30,
        carbohydrates: 40,
        water: 33
      },
      micros: {
        vitamins: 22,
        dietryMinerals: 100
      },
      calories: 100,
      items: [
        {
          item: "eggs",
          proportion: 2,
          unit: "count"
        },
        {
          item: "eggs",
          proportion: 2,
          unit: "count"
        }
      ]
    },

    {
      type: "Lunch",
      food: "Omellete with 3 eggs",
      macros: {
        protein: 20,
        dietryFat: 30,
        carbohydrates: 40,
        water: 33
      },
      micros: {
        vitamins: 22,
        dietryMinerals: 100
      },
      calories: 100,
      items: [
        {
          item: "eggs",
          proportion: 2,
          unit: "count"
        }
      ]
    },

    {
      type: "Dinner",
      food: "Omellete with 3 eggs",
      macros: {
        protein: 20,
        dietryFat: 30,
        carbohydrates: 40,
        water: 33
      },
      micros: {
        vitamins: 22,
        dietryMinerals: 100
      },
      calories: 100,
      items: [
        {
          item: "eggs",
          proportion: 2,
          unit: "count"
        }
      ]
    },
  ]
}

interface MealPlanProps {
  isAvailable: boolean
  plans: NutritionPlan | null
}

function MealDropdown({ meal, item }: { meal: DailyNutritionPlan, item: number }) {
  return (
    <AccordionItem className={`item-${item}`} value={`item-${item}`}>
      <AccordionTrigger className="text-base">
        {meal.day}
      </AccordionTrigger>
      <AccordionContent className="space-y-2">
        <Accordion type="single" collapsible className="w-full">
          {meal.meals.map((item, index) => (
            <DailyMealCard key={index} meal={item} itemKey={index} />
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  )
}

function DailyMealCard({ meal, itemKey }: { meal: Meals, itemKey: number }) {
  return (
    <AccordionItem value={`item-${itemKey}`} className="md:mx-4">
      <AccordionTrigger>{meal.type}</AccordionTrigger>
      <AccordionContent>
        <MealTable meal={meal} />
      </AccordionContent>
    </AccordionItem>
  )
}

function MealTable({ meal }: { meal: Meals }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-2/6">Food</TableHead>
          <TableHead>Macros</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Micros</TableHead>
          <TableHead className="text-right">Calories</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{meal.food}</TableCell>
          <TableCell>
            <MacrosTable items={meal.micros} />
          </TableCell>
          <TableCell>
            {meal.items.map((item, index) => (
              <div key={index}>
                <p>
                  {item.item}:{item.proportion}
                </p>
              </div>
            ))}
          </TableCell>
          <TableCell>
            <MacrosTable items={meal.macros} />
          </TableCell>
          <TableCell className="text-right">
            {meal.calories}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

function MacrosTable({ items }: { items: MacroNutrients | MicroNutrients }) {
  const macroArray = Object.entries(items)
  return (
    <>
      <div className="">
        {macroArray.map(([key, value]) => (
          <div className="flex gap-x-2" key={value}>
            {key}: <p className="font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default function MealPlan({ isAvailable, plans }: MealPlanProps) {
  return (
    <Card className="overflow-y-auto">
      <CardHeader>
        <CardTitle >Meal Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {isAvailable ?
          <Accordion type="single" collapsible className="w-full">
            {plans ? plans?.dailyPlan.plan.map((item: DailyNutritionPlan, index: number) => (
              <MealDropdown meal={item} key={index} item={index} />
            )) : "plan not created yet"}
          </Accordion>
          :
          <PlanNotAvailable />}
      </CardContent>
    </Card>
  )
}
