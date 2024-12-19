import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { PiCaretUpDownThin } from "react-icons/pi";
import PlanNotAvailable from "./plan-not-available";

const sampleMealPlan = [
  {
    meal: "Breakfast",
    food: "Scrambled Eggs with whole-wheat toast and avocado",
    macros: [
      {
        item: "Protein",
        quantity: "25g"
      },
      {
        item: "Fats",
        quantity: "25g"
      },
      {
        item: "Carbs",
        quantity: "25g"
      },
    ],
    micros: [
      {
        item: "Protein",
        quantity: "25g"
      },
      {
        item: "Fats",
        quantity: "25g"
      },
      {
        item: "Carbs",
        quantity: "25g"
      },
    ],
    Proportions:
      [
        {
          item: "Eggs",
          quantity: "3"
        },
        {
          item: "Eggs",
          quantity: "3"
        },
      ]
  }
]

const check = {
  "day": "Monday",
  "meals": {
    "breakfast": {
      "food": "Scrambled eggs with spinach and a slice of whole wheat toast.",
      "macroMicro": {
        "calories": 350,
        "protein": "20g",
        "carbohydrates": "30g",
        "fats": "15g"
      },
      "proportions": {
        "eggs": "100g",
        "spinach": "50g",
        "whole wheat toast": "40g"
      }
    },
    "lunch": {
      "food": "Grilled chicken breast with mixed salad and quinoa.",
      "macroMicro": {
        "calories": 600,
        "protein": "45g",
        "carbohydrates": "55g",
        "fats": "20g"
      },
      "proportions": {
        "chicken breast": "150g",
        "mixed salad": "100g",
        "quinoa": "50g"
      }
    },
    "dinner": {
      "food": "Baked fish with steamed broccoli and brown rice.",
      "macroMicro": {
        "calories": 650,
        "protein": "35g",
        "carbohydrates": "80g",
        "fats": "15g"
      },
      "proportions": {
        "fish": "120g",
        "broccoli": "100g",
        "brown rice": "60g"
      }
    }
  },
  "totalDayMacroMicro": {
    "calories": 1600,
    "protein": "100g",
    "carbohydrates": "165g",
    "fats": "50g"
  }
}

function MealTable() {
  // TODO: Add section of "show similar options"
  return (
    <Table>
      <TableCaption>Meals for Today</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="max-w-40">Food</TableHead>
          <TableHead>Macros</TableHead>
          <TableHead className="">Micros</TableHead>
          <TableHead className="text-right">Proportions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {sampleMealPlan.map(item => (
          <TableRow>
            <TableCell className="content-start max-w-32">{item.food}</TableCell>
            <TableCell>{item.macros.map(item => (<ul><li>{item.item + ":" + item.quantity}</li></ul>))}</TableCell>
            <TableCell>{item.micros.map(item => (<ul><li>{item.item + "   " + item.quantity}</li></ul>))}</TableCell>
            <TableCell className="text-right">
              {item.Proportions.map(item => (<div>{`${item.item} : ${item.quantity}`}</div>))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// interface MealItemProps {
//   mealName: string
//   meal: 
// }

function MealItem() {
  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full flex items-center justify-between">
        <div className="w-full p-2 border-b flex justify-between">
          <h3>Breakfast</h3>
          <PiCaretUpDownThin className="font-bold text-xl" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="">
        <MealTable />
      </CollapsibleContent>
    </Collapsible>
  )
}

interface MealPlanProps {
  isAvailable: boolean
}

export default function MealPlan({ isAvailable }: MealPlanProps) {

  return (
    <Card className="max-h-96 overflow-y-auto">
      <CardHeader>
        <CardTitle>Meal Plan for Today</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {isAvailable ? <div>
          <MealItem />
          <MealItem />
          <MealItem />
        </div> : <PlanNotAvailable />}
      </CardContent>
    </Card>
  )
}
