import { hash } from 'bcryptjs'
import { verify } from 'jsonwebtoken'

export const hashPassword = async (
  password: string,
  salt: string
): Promise<string> => {
  return await hash(password, salt)
}

export const verifyToken = (token: string, key: string): string => {
  try {
    const payload = verify(token, key)
    return payload as string
  } catch (error) {
    console.error('Token Verification failed', error)
    throw new Error('Invalid token')
  }
}
