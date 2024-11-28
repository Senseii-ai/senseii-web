'use server'

import { signIn } from '@/auth'
import { User } from '@/lib/types'
import { AuthError } from 'next-auth'
import { z } from 'zod'
import { ResultCode } from '@/lib/utils'
import { userLoginDTO, UserLoginDTO } from '@senseii/types'

export async function getUser(email: string): Promise<User | undefined> {
  const response = await fetch('http://localhost:9090/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email
    })
  })

  const { data } = await response.json()
  if (!data) {
    return undefined
  }

  const user: User = {
    id: data.id,
    email: data.email,
    password: data.password,
    salt: data.salt
  }
  return user
}

interface Result {
  type: "success" | "failed"
  resultCode: ResultCode
}

export async function login(data: UserLoginDTO): Promise<Result> {
  try {
    const validatedData = userLoginDTO.safeParse(data)
    if (!validatedData.success) {
      return {
        type: "failed",
        resultCode: ResultCode.InvalidCredentials
      }
    }
    const { email, password } = validatedData.data
    console.log("LOGIN DATA VALIDATION WORKED")
    return await signIn("credentials", {
      email,
      password,
      redirect: false
    })
  } catch (error) {
    console.log("SOMETHING FUCKUP HAPPENED", error)
    throw error
  }
}

// export async function authenticate(
//   _prevState: Result | undefined,
//   formData: FormData
// ): Promise<Result | undefined> {
//   try {
//     // destructure the form data
//     const email = formData.get('email')
//     const password = formData.get('password')
//
//     // validate the credentials
//     const parsedCredentials = z
//       .object({
//         email: z.string().email(),
//         password: z.string().min(6)
//       })
//       .safeParse({
//         email,
//         password
//       })
//
//     if (parsedCredentials.success) {
//       const serverResponse = await signIn('credentials', {
//         email,
//         password,
//         redirect: false
//       })
//
//       return {
//         type: 'success',
//         resultCode: ResultCode.UserLoggedIn
//       }
//     } else {
//       return {
//         type: 'error',
//         resultCode: ResultCode.InvalidCredentials
//       }
//     }
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return {
//             type: 'error',
//             resultCode: ResultCode.InvalidCredentials
//           }
//         default:
//           return {
//             type: 'error',
//             resultCode: ResultCode.UnknownError
//           }
//       }
//     }
//   }
// }
