'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function VerifyEmail() {
  const handleVerification = () => {
    toast.message("form submit here.")
  }
  return (
    <div className="container mx-auto w-full flex items-center min-h-[500px] h-full justify-center">
      <Card className="max-w-96 w-full">
        <CardHeader>
          <CardTitle>Verify you are a Human</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleVerification}>Verify Email</Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-slate-300">
            Your account will be usable once we verify this email really belongs to you.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
