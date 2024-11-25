import 'next-auth'
import "@auth/core/jwt"

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name?: string
    accessToken: string
    refreshToken: string
  }

  interface Session {
    user: {
      id: string
      email: string
      name?: string
    }
    accessToken: string
    refreshToken: string
    error?: string
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    check: string
    accessToken: string
  }
}
