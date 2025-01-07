import { auth } from '@/auth'
import FormWrapper from '@/components/form-wrapper'
import SignupForm from '@/components/signup-form'
import { Session } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SignupPage() {
  const session = (await auth()) as Session

  if (session) {
    console.log('I am the culprit')
    redirect('/')
  }

  return (
    <main className="flex flex-col items-center p-4">
      <div className="w-3/4 max-w-[400px]">
        <FormWrapper
          header="Create a new Account"
          socials={true}
          backLink={{
            desctiption: 'already have an account?',
            buttontext: 'Login',
            url: '/login'
          }}
        >
          <SignupForm />
        </FormWrapper>
      </div>
    </main>
  )
}
