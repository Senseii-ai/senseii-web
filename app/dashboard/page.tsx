import { ComboboxItem } from "@/components/combobox";
import TabComponent from "@/components/dashboard-tabs";
import DashboardNav from "@/components/ui/dashboard-nav";

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

export default function GoalDashboard() {
  return (
    <div className="container my-5 space-y-5">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <DashboardNav goalSelectorProps={{ comboboxItems: goals }} />
      <TabComponent />
    </div>
  )
}
