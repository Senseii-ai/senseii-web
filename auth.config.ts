import type { DefaultSession, NextAuthConfig } from "next-auth";
import "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

import { userLoginDTO } from "@senseii/types";
import { authAPI } from "./lib/api/auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}

export default {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = userLoginDTO.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const response = await authAPI.signIn({ email: email, password: password })
          console.log("API CALL WORKED, FINAL RESPONSE", response)

          // OAuth was used to sign in.
          if (!response) {
            return null;
          }
          return response;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, accessToken: user.accessToken, refreshToken: user.refreshToken }
      } return token
    },

    // session transforms the sessoin object.
    async session({ session, token }) {

      if (token) {
        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshToken
      }
      return session
    }
  },
} satisfies NextAuthConfig;
