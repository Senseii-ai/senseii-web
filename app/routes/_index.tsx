import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect, useLoaderData } from "@remix-run/react";
import { Card, CardContent } from "~/components/ui/card";
import { ComboboxItem } from "~/components/ui/dashboard/combobox";
import TabComponent from "~/components/ui/dashboard/dashboard-tabs";
import DashboardNav from "~/components/ui/dashboard/dashboard.nav";
import { SignedIn, SignedOut, SignInButton } from "@clerk/remix";
import CreateGoalModal from "./create-goal";
import { BE_ROUTES, httpGet } from "~/lib/http";
import { UserGoals } from "@senseii/types";
import { getAuth } from "@clerk/remix/ssr.server";
import { toast } from "~/hooks/use-toast";

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
  const { userId, getToken } = await getAuth(args)
  const token = await getToken()
  if (!userId || !token) {
    return redirect('/sign-in?redirect_url=' + '/')
  }
  const userGoals = await httpGet<UserGoals[]>(BE_ROUTES.getUserGoals, token)
  // if not successful, some internal server error
  if (!userGoals.success) {
    return json({ error: userGoals.error.message, goals: [] })
  }
  return { error: null, goals: userGoals.data }
}

// NOTE: Handle the section for when user profile is not created.
export default function Index() {
  const { error, goals } = useLoaderData<typeof loader>()
  if (error) {
    toast({ title: error })
  }
  if (goals.length === 0) {
    return <EmptyDashboard />
  }
  return (
    <div className="h-screen">
      <SignedIn>
        <Card className="py-5 px-2 w-full">
          <CardContent>
            <GoalDashboard />
          </CardContent>
        </Card>
      </SignedIn>
      <SignedOut>
        <h1>You are Signed Out</h1>
        <p className="text-sm bg-muted-foreground">Please signin to continue</p>
        <SignInButton />
      </SignedOut>
    </div>

  )
}

export function EmptyDashboard() {
  return (
    <div className="flex flex-col mx-20 h-screen items-center justify-center">
      <div className="h-1/3 flex flex-col justify-between items-center max-w-80">
        <h2>You have no goals defined yet, please add one to get started</h2>
        <CreateGoalModal />
        <p className="text-sm text-muted-foreground text-center">Click the plus icon to start defining your goal.</p>
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
