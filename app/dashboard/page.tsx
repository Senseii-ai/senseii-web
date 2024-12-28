import { auth } from "@/auth";
import { ComboboxItem } from "@/components/combobox";
import TabComponent from "@/components/dashboard-tabs";
import DashboardNav from "@/components/ui/dashboard-nav";
import { redirect } from "next/navigation";

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

export default async function GoalDashboard() {

  const user = (await auth())
  if (!user) {
    redirect('/login')
  }
  return (
    <div className="container my-5 space-y-5">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <DashboardNav goalSelectorProps={{ comboboxItems: goals }} />
      <TabComponent />
    </div>
  )
}
