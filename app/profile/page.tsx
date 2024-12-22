'use client'

import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ArrowLeftIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Link from "next/link";
import { toast } from "sonner";

export default function Profile() {
  return (
    <div className="container flex flex-col gap-y-2 h-screen">
      <Link href={"dashboard"} className="flex items-center gap-x-2">
        <ArrowLeftIcon />
        Back
      </Link>
      <Card className="h-full max-h-72 flex flex-col space-y-10">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-tl from-[#FEAC5E] via-[#C779D0]">
          </div>

          <div className="absolute top-1/2 z-10 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Avatar className="w-full h-full">
                <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
              </Avatar>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full">
            <div className="flex flex-col justify-start py-4 items-center">
              <h2 className="text-xl font-semibold text-gray-800">{"User Name"}</h2>
              <p>Member since {(new Date).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-between gap-x-2">
        <Card className="w-full py-4">
          <CardContent className="flex items-center py-2">
            <div>
              <h2 className="text-2xl font-semibold">22</h2>
              <h2 >Goals Achieved</h2>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full py-4">
          <CardContent className="flex items-center py-2">
            <div>
              <h2 className="text-2xl font-semibold">22</h2>
              <h2 >Active Goals</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="h-full">
        <CardHeader>
          <div className="flex justify-between">
            <h1 className="font-semibold text-lg">
              Basic Information
            </h1>
            <Pencil1Icon onClick={() => toast.info("not supported yet")} width={20} height={20} />
          </div>

        </CardHeader>
        <CardContent className="h-full">
          <ScrollArea className="h-full overflow-auto w-full rounded-md border">
            <div className="p-4">
              <div className="text-sm">
                Hello
              </div>
              <Separator className="my-2" />

              <div className="text-sm">
                Hello
              </div>
              <Separator className="my-2" />

              <div className="text-sm">
                Hello
              </div>
              <Separator className="my-2" />

              <div className="text-sm">
                Hello
              </div>
              <Separator className="my-2" />

              <div className="text-sm">
                Hello
              </div>
              <Separator className="my-2" />

              <div className="text-sm">
                Hello
              </div>
              <Separator className="my-2" />

              <div className="text-sm">
                Hello
              </div>
              <Separator className="my-2" />

              <div className="text-sm">
                Hello
              </div>
              <Separator className="my-2" />

              <div className="text-sm">
                Hello
              </div>
              <Separator className="my-2" />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
