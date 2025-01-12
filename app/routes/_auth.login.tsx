import { Link } from "@remix-run/react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"

export default function Login() {
  return (
    <Card className="w-4/5">
      <CardHeader><CardTitle>Login</CardTitle></CardHeader>
      <CardContent>
        <LoginUpForm />
      </CardContent>
      <CardFooter>
        <div className="flex gap-x-2">
          <p>don&apos;t have an account?</p>
          <Link to={"/signup"}>create one</Link>
        </div>
      </CardFooter>
    </Card>
  )
}

function LoginUpForm() {
  return (
    <div>Login Form</div>
  )
}
