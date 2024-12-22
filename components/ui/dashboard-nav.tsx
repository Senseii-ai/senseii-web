"use client"

import Link from "next/link";
import GoalSelector, { GoalSelectorProps } from "./goal-selector";
import React from "react";

interface DashboardNavProps {
  goalSelectorProps: GoalSelectorProps
}

const navItems = [
  "Overview",
  "Plans",
]

export default function DashboardNav({ goalSelectorProps: { user, comboboxItems } }: DashboardNavProps) {
  const [selected, setSelected] = React.useState(0)

  const handleClick = (item: number) => {
    setSelected(item)
  }


  return (
    <div className="flex items-center gap-x-5 border-b pb-5">
      <GoalSelector user={user} comboboxItems={comboboxItems} />
      <nav className="md:space-x-5 space-x-2">
        <Link
          href={"dashboard"}
          className={`${selected === 0 ? "text-primary" : "text-muted-foreground"} text-base font-medium transition-colors hover:text-primary`}
          onClick={() => handleClick(0)}
        >
          Overview
        </Link>

        <Link
          href={"profile"}
          className={`${selected === 1 ? "text-primary" : "text-muted-foreground"} text-base font-medium transition-colors hover:text-primary`}
          onClick={() => handleClick(1)}
        >
          Profile
        </Link>
      </nav>
    </div>
  )
}
