import Link from "next/link"
import Socials from "./socials"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

interface FormWrapperProps {
  backLink: {
    desctiption: string,
    buttontext: string,
    url: string
  }
  header: string,
  socials?: boolean
  children: React.ReactNode
}

export default function FormWrapper({ children, backLink, header, socials }: FormWrapperProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="font-semibold text-xl">
          {header}
        </h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-5">
          {children}
          {socials ? (
            <Socials />
          ) : ""}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p>{backLink.desctiption}</p>
        <Link href={backLink.url}>
          <Button variant={"link"} className="pl-2 ">
            <h3 className="text-base">
              {backLink.buttontext}
            </h3>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )

}
