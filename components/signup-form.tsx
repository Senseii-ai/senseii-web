"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SignUpFormSchema, signupFormSchema } from "@senseii/types";
import { useState } from "react";
import { signup } from "@/app/(auth)/signup/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter()
  const [isPending, setIsPending] = useState<boolean>(false)
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  })
  const handleSubmit = async (fields: SignUpFormSchema) => {
    setIsPending(true)
    const response = await signup(fields)
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
    <Form {...form}>
      <form className="space-y-5" method="post" onSubmit={form.handleSubmit(handleSubmit)}>
        <div>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
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
                  <Input {...field} type="password" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        <Button className="w-full" disabled={isPending} type="submit">create account</Button>
      </form>
    </Form>
  )
}
