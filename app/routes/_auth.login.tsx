import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node"
import { TabsContent } from "@radix-ui/react-tabs"
import { Form, useSubmit } from "@remix-run/react"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { FaGoogle } from "react-icons/fa";
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { commitSession, getSession } from "~/sessions";
// import { authService } from "~/services/auth";
import { userLoginDTO } from "@senseii/types";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"))

  if (session.has("accessToken")) {
    return redirect("/")
  }

  const data = { error: session.get("error") }

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  })
}

export async function action({ request }: ActionFunctionArgs) {
  // const session = await getSession(request.headers.get("Cookie"))
  // console.log("Session", session)
  const data = await request.formData()

  const isOAuth = data.get("provider") !== null
  if (isOAuth) {
    return json()
  }

  return null
}

export default function Login() {
  return (
    <Card className="w-4/5">
      <CardHeader><CardTitle>Authentication</CardTitle></CardHeader>
      <CardContent>
        <Tabs className="w-full" defaultValue="signup">
          <TabsList className="w-full flex justify-between">
            <TabsTrigger value="signup" className="w-full">
              SignUp
            </TabsTrigger>
            <TabsTrigger value="login" className="w-full">
              Login
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signup"><SignUpForm /></TabsContent>
          <TabsContent value="login"><LoginUpForm /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function SignUpForm() {
  const submit = useSubmit()

  const handleOAuthLogin = (provider: string) => {
    submit({ provider }, { method: "post" })
  }

  return (
    <Form method="post">

      {/* name of the user */}
      <div className="space-y-2">
        <Label htmlFor="login-name">Name</Label>
        <Input
          type="text"
          id="login-name"
          name="name"
          required
        />
      </div>

      {/* email of the user */}
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          type="email"
          id="login-email"
          name="email"
          required
        />
      </div>


      {/* password of the user */}
      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          type="password"
          name="password"
          id="login-password"
          required
        />
      </div>

      {/* login Button for credentials login */}
      <Button className="w-full my-2">Login</Button>

      <h2>or Continue with</h2>

      <div className="flex justify-between gap-y-2 gap-x-2 my-4">
        <Button className="w-full" type="button" onClick={() => handleOAuthLogin("google")}><FaGoogle className="text-xs" /></Button>
        <Button className="w-full" type="button" onClick={() => handleOAuthLogin("github")} ><GitHubLogoIcon /></Button>
      </div>
    </Form>
  )
}

function LoginUpForm() {
  return (
    <div>Login Form</div>
  )
}
