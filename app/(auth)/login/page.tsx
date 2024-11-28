import { auth } from '@/auth'
import FormWrapper from '@/components/form-wrapper'
import LoginForm from '@/components/login-form'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = (await auth())

  if (session) {
    redirect('/')
  }

  return (
    <main className="flex flex-col items-center p-4">
      <div className='w-3/4 max-w-[400px]'>
        <FormWrapper socials={true} header='Login' backLink={{ buttontext: "signup", desctiption: "don't have an account?", url: "/signup" }}>
          <LoginForm />
        </FormWrapper>
      </div>
    </main>
  )
}
