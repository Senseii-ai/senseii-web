import type { MetaFunction } from "@remix-run/node";
// import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <Button>Hello</Button>
      {/* <ModeToggle /> */}
    </div>
  )
}
