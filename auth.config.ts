import type { DefaultSession, NextAuthConfig } from 'next-auth'
import 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'
import Github from "next-auth/providers/github"

import { userLoginDTO } from '@senseii/types'
import { authAPI } from './lib/api/auth'

declare module 'next-auth' {
  interface User {
    accessToken: string
    refreshToken: string
  }

  interface Session {
    user: User & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    refreshToken: string
  }
}

export default {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    Github,
    Credentials({
      async authorize(credentials) {
        const validatedFields = userLoginDTO.safeParse(credentials)
        if (validatedFields.success) {
          try {
            const { email, password } = validatedFields.data
            const response = await authAPI.signIn({
              name: "",
              email: email,
              password: password
            })

            // OAuth was used to sign in.
            if (!response) {
              return null
            }
            return response.data
          } catch (error) {
            return null
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (token && !token.accessToken) {
        // User logged in using OAuth.
        const isSaved = await authAPI.OAuthLogin({ email: token.email as string, name: token.name as string })
        if (!isSaved || !isSaved.success) {
          return null
        }
        if (user) {
          token = {
            ...token,
            accessToken: isSaved.data.accessToken,
            refreshToken: isSaved.data.refreshToken
          }
        }
        return token
      }
      if (user) {
        token = {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken
        }
      }
      return token
    },

    // session transforms the sessoin object.
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshToken
      }
      return session
    }
  }
} satisfies NextAuthConfig
