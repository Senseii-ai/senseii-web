import { TwitterLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";

export default function Socials() {
  return (
    <div className="gap-x-3 flex justify-between">
      <Button className="w-full">
        <FaGoogle className="w-5 h-5" />
      </Button>
      <Button className="w-full">
        <GitHubLogoIcon className="w-5 h-5" />
      </Button>
      <Button className="w-full">
        <TwitterLogoIcon className="w-5 h-5" />
      </Button>
    </div>
  )
}
