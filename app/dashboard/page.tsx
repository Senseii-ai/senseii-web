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
    <div className="p-5 space-y-5">
      <DashboardNav goalSelectorProps={{ comboboxItems: goals }} />
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <TabComponent />
    </div>
  )
}
