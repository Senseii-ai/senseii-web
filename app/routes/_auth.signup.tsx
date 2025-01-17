// import { Form, json, Link, redirect, useActionData, useLoaderData, useNavigation, useSubmit } from "@remix-run/react"
// import { GitHubLogoIcon } from "@radix-ui/react-icons"
// import { FaGoogle } from "react-icons/fa";
// import { Button } from "~/components/ui/button"
// import { Input } from "~/components/ui/input"
// import { Label } from "~/components/ui/label"
// import { useEffect } from "react";
// import { toast } from "~/hooks/use-toast";
// import { commitSession, getSession } from "~/sessions";
// import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
// // import { authService } from "~/services/auth";
// import { z } from "zod";
// import { Separator } from "~/components/ui/separator";
//
// const userSignupDTO = z.object({
//   name: z.string(),
//   email: z.string(),
//   password: z.string().min(8),
// })
//
// export async function loader({ request }: LoaderFunctionArgs) {
//   const session = await getSession(request.headers.get("Cookie"))
//
//   if (session.has("accessToken")) {
//     return redirect("/")
//   }
//
//   const data = { error: session.get("error") }
//
//   return json(data, {
//     headers: {
//       "Set-Cookie": await commitSession(session)
//     }
//   })
// }
//
// export async function action({ request }: ActionFunctionArgs) {
//   const session = await getSession(request.headers.get("Cookie"))
//   const data = await request.formData()
//
//   const isOAuth = data.get("provider") !== null
//   if (isOAuth) {
//     session.flash("error", "OAuth not supported")
//     return redirect("/signup", {
//       headers: {
//         "Set-Cookie": await commitSession(session)
//       }
//     })
//   }
//
//   const formData = {
//     name: data.get("name"),
//     email: data.get("email"),
//     password: data.get("password")
//   }
//
//   const validatedData = userSignupDTO.safeParse(formData)
//   if (!validatedData.success) {
//     const error = validatedData.error
//     console.log("error", error)
//     session.flash("error", "Invalid credentials")
//     const values = Object.fromEntries(data)
//     console.log("VALUES", values)
//     return json({ error, values })
//   }
//
//   // const user = await authService.signIn(validatedData.data);
//
//   return null
// }
// export default function signup() {
//   return (
//     <Card className="md:w-1/4 w-4/5">
//       <CardHeader><CardTitle className="mx-auto">Signup with us</CardTitle></CardHeader>
//       <CardContent><SignUpForm />
//       </CardContent>
//       <CardFooter>
//         <div className="flex gap-x-2">
//           <p>Already have an account?</p>
//           <Link className="font-semibold" to={"/login"}>Log in</Link>
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }
//
// export function SignUpForm() {
//   const { error } = useLoaderData<typeof loader>()
//   const actionData = useActionData<typeof action>()
//   const navigation = useNavigation()
//   useEffect(() => {
//     if (error && !navigation.formData) {
//       toast({
//         title: "OAuth Not supported yet.",
//         description: "We don't support OAuth yet",
//       })
//     }
//   }, [error, navigation])
//   const submit = useSubmit()
//
//   const handleOAuthSignup = (provider: string) => {
//     submit({ provider }, { method: "post" })
//   }
//
//   return (
//     <Form method="post">
//
//       <div className="">
//         <h2>Continue with</h2>
//
//         <div className="flex justify-between gap-y-2 gap-x-2 my-4">
//           <Button className="w-full" type="button" onClick={() => handleOAuthSignup("google")}><FaGoogle className="text-xs" /></Button>
//           <Button className="w-full" type="button" onClick={() => handleOAuthSignup("github")} ><GitHubLogoIcon /></Button>
//         </div>
//       </div>
//
//       <h2 className="">or</h2>
//
//       <Separator className="my-5" />
//
//       {/* name of the user */}
//       <div className="space-y-2">
//         <Label htmlFor="signup-name">Name</Label>
//         <Input
//           defaultValue={actionData?.values.name as string}
//           placeholder="Name"
//           type="text"
//           id="signup-name"
//           name="name"
//           required
//         />
//       </div>
//
//       {/* email of the user */}
//       <div className="space-y-2">
//         <Label htmlFor="signup-email">Email</Label>
//         <Input
//           type="email"
//           defaultValue={actionData?.values.email as string}
//           placeholder="Email"
//           id="signup-email"
//           name="email"
//           required
//         />
//       </div>
//
//
//       {/* password of the user */}
//       <div className="space-y-2">
//         <Label htmlFor="signup-password">Password</Label>
//         <Input
//           type="password"
//           placeholder="minimum 8 characters"
//           defaultValue={actionData?.values.password as string}
//           name="password"
//           id="signup-password"
//           min={"8"}
//           required
//         />
//       </div>
//
//       {/* signup Button for credentials signup */}
//       <Button className="w-full my-2">Signup</Button>
//     </Form>
//   )
// }
//

