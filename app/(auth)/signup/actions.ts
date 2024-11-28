'use server'

import { authAPI } from '@/lib/api/auth'
import { signupFormSchema, AuthResponse, HTTP, SignUpFormSchema } from '@senseii/types'
import { ZodError } from 'zod'

export async function signup(data: SignUpFormSchema): Promise<AuthResponse | undefined> {
  try {
    const validatedUser = signupFormSchema.safeParse(data)
    if (!validatedUser.success) {
      return {
        code: HTTP.STATUS.BAD_REQUEST.toString(),
        message: HTTP.STATUS_MESSAGE[HTTP.STATUS.BAD_REQUEST],
        details: '',
        status: 'failed'
      }
    } else {
      const { firstName, lastName, email, password } = validatedUser.data
      const userDTO: SignUpFormSchema = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      }
      const response = await authAPI.signUp(userDTO)
      if (response && response.success === true) {
        return {
          code: HTTP.STATUS.OK.toString(),
          message: "user created successfully",
          details: "",
          status: "success"
        }
      }
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      console.error("Validation error")
      throw {
        message: "validation error"
      }
    }
    return {
      status: error.status,
      message: error.message,
      details: "",
      code: error.code
    }
  }
}
