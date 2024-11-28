"use client"

import { userLoginDTO, UserLoginDTO } from "@senseii/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import { login } from "@/app/(auth)/login/actions"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LoginForm() {
  const router = useRouter()
  const [isPending, setPending] = useState<boolean>(false)
  const form = useForm<UserLoginDTO>({
    resolver: zodResolver(userLoginDTO),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const handleSubmit = async (fields: UserLoginDTO) => {
    setPending(true)
    const response = await login(fields)
    if (response?.status === "success") {
      setPending(false)
      toast.success(response.message)
      router.push("/")
      router.refresh()
    } else {
      toast.error(response.message)
      setPending(false)
    }


  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-y-2">
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input{...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} type="password" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </Form>
  )
}
