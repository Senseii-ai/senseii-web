import { auth } from "@/auth"
import { Session } from "next-auth"
import { BaseURL } from "../http"

export const chatApi = {
  chat: async ({ chatId, content }: { chatId: string, content: string }) => {
    // TODO: since axios doesn't natively supports web stream, using fetch for this route.
    const session = await auth() as Session

    const response = await fetch(`${BaseURL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${session.user.accessToken}`
      },
      body: JSON.stringify({ chatId, content })
    })
    return response
  }
}
