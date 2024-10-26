import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { z } from 'zod'
import { getUser } from './app/login/actions'
import { hashPassword } from './lib/crypt/crypt'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        console.log('Credentials', credentials.email)

        // Parse the data being sent by the form
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6)
          })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUser(email)

          if (!user) return null
          // verify password
          const hashedPassword = await hashPassword(password, user.salt)
          if (user.password === hashedPassword) {
            return user
          }
          return null
        }

        return null
      }
    })
  ]
})
