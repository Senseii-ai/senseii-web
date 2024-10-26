import { BaseUrl } from '@/lib/types'

export const sendUserMessage = async (
  userId: string,
  chatId: string,
  content: string
) => {
  try {
    const url = `${BaseUrl}/chat`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        chatId: chatId,
        content: content
      })
    })

    const serverResponse = await response.json()
    return serverResponse.data
  } catch (error) {
    return null
  }
}
