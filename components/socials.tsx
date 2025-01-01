'use client'

import { TwitterLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";
import { infoLogger } from "@/lib/logger/logger";
import { loginGithub } from "@/app/(auth)/login/actions";

export default function Socials() {
  const signInGithub = async () => {
    infoLogger({ message: "github login" })
    return await loginGithub()
  }
  return (
    <div className="gap-x-3 flex justify-between">
      <Button className="w-full">
        <FaGoogle className="w-5 h-5" />
      </Button>
      <Button onClick={() => signInGithub()} className="w-full">
        <GitHubLogoIcon className="w-5 h-5" />
      </Button>
      <Button className="w-full">
        <TwitterLogoIcon className="w-5 h-5" />
      </Button>
    </div>
  )
}
