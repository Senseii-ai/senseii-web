import { Outlet } from "@remix-run/react";
import { ModeToggle } from "~/components/mode-toggle";

export default function AuthLayout() {
  return (
    <div className="w-full h-full">
      <div className="h-12 absolute top-0 right-0">
        <ModeToggle />
      </div>
      <div className="flex items-center justify-center h-full">
        <Outlet />
      </div>
    </div>
  )
}
