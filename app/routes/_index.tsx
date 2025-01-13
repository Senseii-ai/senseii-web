import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { Card, CardContent } from "~/components/ui/card";
import { ComboboxItem } from "~/components/ui/dashboard/combobox";
import TabComponent from "~/components/ui/dashboard/dashboard-tabs";
import DashboardNav from "~/components/ui/dashboard/dashboard.nav";

const goals: ComboboxItem[] = [
  {
    value: "loose weight",
    label: "Loose weight",
  },
  {
    value: "gain weight",
    label: "Gain weight",
  },
  {
    value: "improve cardio health",
    label: "Improve Cardio Health",
  },
]

export const meta: MetaFunction = () => {
  return [
    { title: "Senseii App" },
    { name: "description", content: "Welcome to Senseii!" },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  const { userId } = await getAuth(args)
  if (!userId) {
    return redirect('/sign-in')
  }

  // const token = await getToken();  // Clerk automatically provides this

  // Forward the token to your Express backend
  // const response = await fetch('http://localhost:9090/health', {
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   }
  // });
  return {}
}

export default function Index() {
  return (
    <Card className="py-5 px-2 w-full">
      <CardContent>
        <GoalDashboard />
      </CardContent>
    </Card>
  )
}



export function GoalDashboard() {
  return (
    <div className="space-y-5">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <DashboardNav goalSelectorProps={{ comboboxItems: goals }} />
      <TabComponent />
    </div>
  )
}
