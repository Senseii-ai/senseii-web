import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TableWrapper from "./table-wrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";

function MealTable() {
  return (
    <Table>
      <TableCaption>Workouts to do today</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>


        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>

      </TableBody>
    </Table>
  )
}

export default function MealPlan() {

  return (
    <Card className="max-h-96 h-full overflow-y-scroll">
      <CardHeader>
        <CardTitle>Meal Plan for Today</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-80 overflow-y-scroll">
          <Collapsible>
            <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
            <CollapsibleContent>
              <MealTable />
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
            <CollapsibleContent>
              <MealTable />
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
            <CollapsibleContent>
              <MealTable />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>

    </Card>

  )
}
