import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Form, useNavigation } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node"
import { CreateUserGoalDTO } from "@senseii/types"
import { nanoid } from "nanoid"
import { BE_ROUTES, httpPost } from "~/lib/http"
import { getAuth } from "@clerk/remix/ssr.server";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { LoadingSpinner } from "~/components/ui/spinner";
import { PlusIcon } from "lucide-react";

export async function loader(args: LoaderFunctionArgs) {
  console.log("was I ever run")
  const { userId, getToken } = await getAuth(args)
  const token = await getToken()
  console.log("in create goal loader", userId, token)
  return null
}

export async function action(args: ActionFunctionArgs) {
  console.log("I was run")
  const formData = await args.request.formData()
  const { userId, getToken } = await getAuth(args)

  const token = await getToken()
  if (!userId || !token) {
    return redirect('/sign-in?redirect_url=' + '/')
  }
  const title = String(formData.get("title"))
  const startDate = new Date()
  const endDate = new Date()

  endDate.setDate(startDate.getDate() + 30)
  const newGoal: CreateUserGoalDTO = {
    userId: userId,
    title: title,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    description: "Not Specified Yet",
    chatId: nanoid()
  }

  const response = await httpPost<string>(BE_ROUTES.createNewGoal, token, newGoal)
  if (!response.success) {
    // unable to create new goal, render toast.
    // FIX: Toaster not working as of now.
    return redirect("/sign-in")
  }
  return redirect(`/chat/${response.data}`)
}

export default function CreateGoalModal() {
  const navigation = useNavigation()
  const isSubmitting = navigation.formAction === "/create-goal"

  return (
    <Dialog >
      <DialogTrigger className="w-full">
        <Button className="w-full max-w-24"><PlusIcon /> </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12">
        <DialogHeader>
          <DialogTitle>Epic goals need Epic Names</DialogTitle>
        </DialogHeader>
        <div>
          {isSubmitting ?
            <div className="flex flex-col items-center justify-center gap-y-5">
              <div>
                <h5 className="font-semibold">Creating your Goal</h5>
              </div>
              <div>
                <LoadingSpinner size={32} />
              </div>
            </div>
            :
            <div className="flex flex-col gap-y-2">
              <Form method="POST" action="/create-goal" className="flex flex-col gap-y-2">
                <div className="text-left-y-2">
                  <Label>Goal Name</Label>
                  <Input name="title" required={true} />
                </div>
                <div className="w-full">
                  <Button type="submit" className="w-full max-w-24" size={"sm"}>Done</Button>
                </div>
              </Form>
              <DialogFooter className="sm:justify-start">
                <p className="text-sm text-muted-foreground">you can edit it later.</p>
              </DialogFooter>
            </div>
          }
        </div>
      </DialogContent>
    </Dialog>

  )
}


