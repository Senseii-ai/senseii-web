'use server'

import { authAPI } from '@/lib/api/auth'
import { signupFormSchema, AuthResponse, HTTP, SignUpFormSchema } from '@senseii/types'
import { z, ZodError } from 'zod'

export async function verifyEmail(token: string): Promise<AuthResponse | undefined> {
  try {
    const validatedToken = z.string().min(128).safeParse(token)
    if (!validatedToken.success) {
      return {
        code: HTTP.STATUS.BAD_REQUEST.toString(),
        message: HTTP.STATUS_MESSAGE[HTTP.STATUS.BAD_REQUEST],
        details: '',
        status: 'failed'
      }
    } else {
      const response = await authAPI.verifyEmail(validatedToken.data)
      if (response && response.success === true) {
        return {
          code: HTTP.STATUS.OK.toString(),
          message: `email verified, please login `,
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
