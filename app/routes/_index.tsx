import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, redirect, useLoaderData, useNavigate, useNavigation } from "@remix-run/react";
import { Card, CardContent } from "~/components/ui/card";
import { ComboboxItem } from "~/components/ui/dashboard/combobox";
import TabComponent from "~/components/ui/dashboard/dashboard-tabs";
import DashboardNav from "~/components/ui/dashboard/dashboard.nav";
import { HiPlus } from "react-icons/hi2";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { LoadingSpinner, spinner } from "~/components/ui/spinner";

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
  const navigation = useNavigation()
  const isSubmitting = navigation.formAction === "/create-goal"

  return (
    <div className="flex flex-col mx-20 h-screen items-center justify-center">
      <div className="h-1/3 flex flex-col justify-between items-center max-w-80">
        <h2>You have no goals defined yet, please add one to get started</h2>
        <Dialog >
          <DialogTrigger className="w-full">
            <Button className="w-full max-w-24"><HiPlus /></Button>
          </DialogTrigger>
          <DialogContent className="w-11/12">
            <DialogHeader>
              <DialogTitle>Epic goals need Epic Names</DialogTitle>
            </DialogHeader>
            <div>
              {isSubmitting ?
                <div className="flex flex-col bg-red-50 items-center justify-center gap-y-5">
                  <div>
                    <h5 className="font-semibold">Creating your Goal</h5>
                  </div>
                  <div>
                    <LoadingSpinner size={32} />
                  </div>
                </div>
                :
                <div className="flex flex-col gap-y-2">
                  <Form method="POST" action="/create-goal" className="flex flex-col gap-y-2">
                    <div className="text-left-y-2">
                      <Label>Goal Name</Label>
                      <Input name="title" required={true} />
                    </div>
                    <div className="w-full">
                      <Button type="submit" className="w-full max-w-24" size={"sm"}>Done</Button>
                    </div>
                  </Form>
                  <DialogFooter className="sm:justify-start">
                    <p className="text-sm text-muted-foreground">you can edit it later.</p>
                  </DialogFooter>
                </div>
              }
            </div>
          </DialogContent>
        </Dialog>
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
