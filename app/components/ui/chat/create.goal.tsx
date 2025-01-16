import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { LoadingSpinner } from "../spinner";
import { Form, useNavigation } from "@remix-run/react";
import { Label } from "../label";
import { Button } from "../button";
import { Input } from "../input";
import { HiPlus } from "react-icons/hi2";

export default function CreateGoalModal() {
  const navigation = useNavigation()
  const isSubmitting = navigation.formAction === "/create-goal"


  return (
    <Dialog >
      <DialogTrigger className="w-full">
        <Button className="w-full max-w-24"><HiPlus /></Button>
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


