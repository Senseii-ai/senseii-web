import { Card, CardContent } from "~/components/ui/card";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Link } from "@remix-run/react";
import { Avatar } from "~/components/ui/avatar";
import UserPreference from "~/components/ui/profiles/user.preference";

export default function Profile() {
  return (
    <div className="flex flex-col h-screen gap-y-2">
      <Link to={"/"} className="flex items-center gap-x-2">
        <ArrowLeftIcon />
        Back
      </Link>
      <Card className="min-h-42 h-[300px] max-h-72 flex flex-col space-y-10">
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
              <h5 className="text-xl font-semibold text-gray-800">{"User Name"}</h5>
              <p>Member since {(new Date).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-between gap-x-2">
        <Card className="w-full py-4">
          <CardContent className="flex items-center py-2">
            <div>
              <h5 className="text-2xl font-semibold">22</h5>
              <h5 >Goals Achieved</h5>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full py-4">
          <CardContent className="flex items-center py-2">
            <div>
              <h5 className="text-2xl font-semibold">22</h5>
              <h5 >Active Goals</h5>
            </div>
          </CardContent>
        </Card>
      </div>

      <UserPreference />
    </div>
  )
}
