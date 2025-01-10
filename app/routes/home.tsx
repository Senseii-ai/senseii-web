import { ModeToggle } from "~/components/mode-toggle";
import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex items-center justify-center h-full"><ModeToggle /></div>
  )
}
