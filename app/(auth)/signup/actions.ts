'use server'

import { signIn } from '@/auth'
import { ResultCode } from '@/lib/utils'
import { authAPI } from '@/lib/api/auth'
import { CreateUserRequest, createUserSchema, HTTP } from '@senseii/types'
import { Axios, AxiosError } from 'axios'
import { ISignupForm, signupFormSchema } from '@/components/signup-form'

// TODO: replace the hardcoded API URLs with env variables
export async function createUser(
  email: string,
  password: string,
  salt: string
) {
  const response = await fetch('http://localhost:9090/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
      salt: salt
    })
  })

  const user = await response.json()
  if (user.type === 'success') {
    return {
      type: 'success',
      resultCode: ResultCode.UserCreated
    }
  }
  return {
    type: 'failed',
    resultCode: ResultCode.UnknownError
  }
}

interface Result {
  type: "error" | "success"
  resultCode: ResultCode
}

export async function signup(data: ISignupForm): Promise<Result | undefined> {
  try {
    const validatedUser = signupFormSchema.safeParse(data)
    if (!validatedUser.success) {
      return {
        type: "error",
        resultCode: ResultCode.InvalidCredentials
      }
    } else {
      const { firstName, lastName, email, password } = validatedUser.data
      const userDTO: CreateUserRequest = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      const response = await authAPI.signUp(userDTO)
    }
  } catch (error) {

  }
}

// export async function signup(
//   _prevState: Result | undefined,
//   formData: FormData
// ): Promise<Result | undefined> {
//   const email = formData.get('email') as string
//   const password = formData.get('password') as string
//   const parsedCredentials = createUserSchema.safeParse({ email, password })
//
//   if (parsedCredentials.success) {
//     try {
//       const result = await authAPI.signUp(parsedCredentials.data)
//       if (result.resultCode === HTTP.STATUS.CREATED) {
//         await signIn('credentials', {
//           email,
//           password,
//           redirect: false
//         })
//       }
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         switch (error.code) {
//           case AxiosError.ERR_BAD_REQUEST:
//             return {
//               type: "error",
//               resultCode: ResultCode.InvalidCredentials
//             }
//           default:
//             return {
//               type: "error",
//               resultCode: ResultCode.UnknownError
//             }
//         }
//       } else {
//         return {
//           type: 'error',
//           resultCode: ResultCode.UnknownError
//         }
//       }
//     }
//   } else {
//     return {
//       type: 'error',
//       resultCode: ResultCode.InvalidCredentials
//     }
//   }
// }
