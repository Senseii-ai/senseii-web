'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { verifyEmail } from "./actions";

export default function VerifyEmail() {
  const router = useRouter()
  const [isPending, setIsPending] = useState<boolean>(false)
  const token = useSearchParams().get("token")

  const handleVerification = async () => {
    setIsPending(true)
    if (!token) {
      toast.error("verification token does not exist")
      return
    }
    const response = await verifyEmail(token)
    if (response?.status === "success") {
      toast.success(response.message)
      router.push("/login")
      router.refresh()
    } else {
      toast.error(response?.message)
      setIsPending(false)
    }
  }
  return (
    <div className="container mx-auto w-full flex items-center min-h-[500px] h-full justify-center">
      <Card className="max-w-96 w-full">
        <CardHeader>
          <CardTitle>Verify you are a Human</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => handleVerification()}>Verify Email</Button>
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
