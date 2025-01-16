// import { createCookieSessionStorage } from "@remix-run/node"
// import { UserLoginReponseDTO } from "@senseii/types"
//
// const isProduction = process.env.NODE_ENV === "production"
//
// type SessionFlashData = {
//   error: string
// }
//
// // FIX: replace with real secret
// const { getSession, commitSession, destroySession } = createCookieSessionStorage<UserLoginReponseDTO, SessionFlashData>(
//   {
//     cookie: {
//       name: "__session",
//       path: "/",
//       httpOnly: true,
//       sameSite: "lax",
//       secrets: ['s3cr3t'],
//       ...(isProduction ? { domain: "app.senseii.in", secure: true } : {})
//     }
//   }
// )
//
// export { getSession, commitSession, destroySession }
