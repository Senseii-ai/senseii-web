import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, redirect, useLoaderData, useNavigate } from "@remix-run/react";
import { Card, CardContent } from "~/components/ui/card";
import { ComboboxItem } from "~/components/ui/dashboard/combobox";
import TabComponent from "~/components/ui/dashboard/dashboard-tabs";
import DashboardNav from "~/components/ui/dashboard/dashboard.nav";
import { HiPlus } from "react-icons/hi2";
import { Button } from "~/components/ui/button";

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
  return { goals: [] }
}

// NOTE: Handle the section for when user profile is not created.
export default function Index() {
  const { goals } = useLoaderData<typeof loader>()
  if (goals.length === 0) {
    return <EmptyDashboard />
  }
  return (
    <Card className="py-5 px-2 w-full">
      <CardContent>
        <GoalDashboard />
      </CardContent>
    </Card>
  )
}

export function EmptyDashboard() {
  const navigate = useNavigate()

  const handleNewChat = async () => {
    // handle creation of new chat.
    // for success response, navigate to /chat/${uuid}.
    // for failed response, toast an error saying failed to create chat, please try again.

    setTimeout(() => {
      navigate("/chat/1")
    }, 2000); // 2000 milliseconds = 2 seconds
  }
  return (
    <div className="flex flex-col mx-20 h-screen items-center justify-center">
      <div className="h-1/3 flex flex-col justify-between items-center max-w-80">
        <h2>You have no goals defined yet, please add one to get started</h2>
        <div className="space-y-2 text-center">
          <Button className="w-full max-w-24" onClick={handleNewChat}><HiPlus /></Button>
          <p className="text-sm text-muted-foreground text-center">Click the plus icon to start defining your goal.</p>
        </div>
      </div>
    </div>
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