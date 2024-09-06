'use server'

import { auth, signIn } from '@/auth'
import { ResultCode, getStringFromBuffer } from '@/lib/utils'
import { z } from 'zod'
import { kv } from '@vercel/kv'
import { getUser } from '../login/actions'
import { AuthError } from 'next-auth'
import { Session } from '@/lib/types'

export async function createUser(email: string, hashedPassword: string) {
  const existingUser = await getUser(email)

  if (existingUser) {
    return {
      type: 'error',
      resultCode: ResultCode.UserAlreadyExists
    }
  } else {
    const user = {
      id: crypto.randomUUID(),
      email,
      password: hashedPassword
    }

    await kv.hmset(`user:${email}`, user)

    return {
      type: 'success',
      resultCode: ResultCode.UserCreated
    }
  }
}

interface Result {
  type: string
  resultCode: ResultCode
}

export async function signup(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  const session = (await auth()) 
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const response = await fetch('http://localhost:9090/signup', {
    headers: {
      Authorization: `Bearer ${}`
    }
  })

  if (parsedCredentials.success) {
    // const salt = crypto.randomUUID()
    //
    // const encoder = new TextEncoder()
    // const saltedPassword = encoder.encode(password + salt)
    // const hashedPasswordBuffer = await crypto.subtle.digest(
    //   'SHA-256',
    //   saltedPassword
    // )
    // const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)

    try {
      // replace this with your Backend call to the DB
      const result = await createUser(email, password)

      if (result.resultCode === ResultCode.UserCreated) {
        await signIn('credentials', {
          email,
          password,
          redirect: false
        })
      }

      return result
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return {
              type: 'error',
              resultCode: ResultCode.InvalidCredentials
            }
          default:
            return {
              type: 'error',
              resultCode: ResultCode.UnknownError
            }
        }
      } else {
        return {
          type: 'error',
          resultCode: ResultCode.UnknownError
        }
      }
    }
  } else {
    return {
      type: 'error',
      resultCode: ResultCode.InvalidCredentials
    }
  }
}
