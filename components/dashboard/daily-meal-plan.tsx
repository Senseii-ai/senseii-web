import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import PlanNotAvailable from "./plan-not-available";
import { IDailyNutritionPlan, IMacroNutrients, IMeals, IMicroNutrients, INutritionPlan, Weekday } from "@senseii/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export const dailyMealPlan: IDailyNutritionPlan = {
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

const days: Weekday[] = ["Monday"]

const weeklyMealPlan = days.map((day) => ({
  ...dailyMealPlan,
  day,
}));

const mealPlan: INutritionPlan = {
  plan: [dailyMealPlan, dailyMealPlan, dailyMealPlan]
}

interface MealPlanProps {
  isAvailable: boolean
}

function MealDropdown({ meal, item }: { meal: IDailyNutritionPlan, item: number }) {
  return (
    <AccordionItem className={`item-${item}`} value={`item-${item}`}>
      <AccordionTrigger className="text-base">
        {meal.day}
      </AccordionTrigger>
      <AccordionContent className="space-y-2">
        <Accordion type="single" collapsible className="w-full">
          {meal.meals.map((item, index) => (
            <DailyMealCard meal={item} itemKey={index} />
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  )
}

function DailyMealCard({ meal, itemKey }: { meal: IMeals, itemKey: number }) {
  return (
    <AccordionItem value={`item-${itemKey}`} className="md:mx-4">
      <AccordionTrigger>{meal.type}</AccordionTrigger>
      <AccordionContent>
        <MealTable meal={meal} />
      </AccordionContent>
    </AccordionItem>
  )
}

function MealTable({ meal }: { meal: IMeals }) {
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
              <div>
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

function MacrosTable({ items }: { items: IMacroNutrients | IMicroNutrients }) {
  const macroArray = Object.entries(items)
  return (
    <>
      <div className="">
        {macroArray.map(([key, value]) => (
          <div className="flex gap-x-2">
            {key}: <p className="font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default function DailyMealPlan({ isAvailable }: MealPlanProps) {
  return (
    <Card className="overflow-y-auto">
      <CardHeader>
        <CardTitle >Meal Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {isAvailable ?
          <Accordion type="single" collapsible className="w-full">
            {weeklyMealPlan.map((item, index) => (
              <MealDropdown meal={item} key={index} item={index} />
            ))}
          </Accordion>
          :
          <PlanNotAvailable />}
      </CardContent>
    </Card>
  )
}
