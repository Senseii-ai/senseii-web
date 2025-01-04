'use server'

import { auth, signIn } from '@/auth'
import { User } from '@/lib/types'
import { AuthError, CredentialsSignin } from 'next-auth'
import { z } from 'zod'
import { ResultCode } from '@/lib/utils'
import { HTTP, userLoginDTO, UserLoginDTO } from '@senseii/types'
import { infoLogger } from '@/lib/logger/logger'

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

export interface AuthResponse {
  code: string
  message: string
  details: string
  status: 'success' | 'failed'
}

export const loginGithub = async () => {
  return await signIn('github')
}

export const loginGoogle = async () => {
  return await signIn('google')
}

export async function login(data: UserLoginDTO): Promise<AuthResponse> {
  try {
    infoLogger({ message: 'credentials login attempt' })
    const validatedData = userLoginDTO.safeParse(data)
    if (!validatedData.success) {
      infoLogger({ message: 'invalid creds', status: 'failed' })
      return {
        code: HTTP.STATUS.BAD_REQUEST.toString(),
        message: HTTP.STATUS_MESSAGE[HTTP.STATUS.BAD_REQUEST],
        details: '',
        status: 'failed'
      }
    }
    const { email, password } = validatedData.data
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    if (result?.error) {
      return {
        code: HTTP.STATUS.UNAUTHORIZED.toString(),
        message: result.error,
        details: '',
        status: 'failed'
      }
    }
    return {
      code: HTTP.STATUS.OK.toString(),
      message: 'login successful',
      details: '',
      status: 'success'
    }
  } catch (error) {
    return {
      code: 'Unknown Error',
      message: error instanceof Error ? error.message : 'Unknown error',
      details: '',
      status: 'failed'
    }
  }
}
