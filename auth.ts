import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import "@auth/core/jwt"
import { authAPI } from './lib/api/auth'

declare module '@auth/core/jwt' {
  interface JWT {
    id: string
    accessToken: string
  }
}

export const { auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
    newUser: "/signup"
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const parsedCredentials = z.object({
          email: z.string().email(),
          password: z.string().min(6)
        }).safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data

          try {
            const response = await authAPI.signIn({ email: email, password: password })
            return {
              id: response.id,
              email: response.email,
              name: response.email,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken
            }
          } catch (error) {
            console.error("Login Failed", error)
            return null
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      console.log("authorized")
      const isLoggedIn = !!auth?.user
      const isOnLoginPage = nextUrl.pathname.startsWith('/login')
      const isOnSignupPage = nextUrl.pathname.startsWith('/signup')

      if (isLoggedIn) {
        if (isOnLoginPage || isOnSignupPage) {
          return Response.redirect(new URL('/', nextUrl))
        }
      }

      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      return token
    },

    // session transforms the sessoin object.
    async session({ session, token }) {
      console.log("session")
      if (token) {
        const { id } = token as { id: string }
        const { user } = session

        session = { ...session, user: { ...user, id }, accessToken: token.accessToken as string }
      }
      return session
    }
  }
})
