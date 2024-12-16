import { chatApi } from '@/lib/api/chat/chat'

export const sendUserMessage = async (
  chatId: string,
  content: string
) => {
  try {
    const response = await chatApi.chat({ chatId: chatId, content: content })
    // TODO: handle errors here.
    if (!response.ok) throw new Error('Network response was not ok')

    const textStream = response.body?.pipeThrough(
      new TransformStream({
        start() { },
        transform(chunk, controller) {
          const decodedText = new TextDecoder().decode(chunk)
          const lines = decodedText.split('\n').filter(line => line.trim())

          for (const line of lines) {
            // Parse only lines that start with "data:"
            if (line.startsWith('data: ')) {
              const data = line.slice(5).trim()
              if (data !== 'DONE') {
                try {
                  const parsed = JSON.parse(data)
                  if (parsed.content) {
                    controller.enqueue(parsed.content)
                  }
                } catch (error) {
                  console.error('JSON parsing error:', error)
                }
              }
            }
          }
        },
        flush(controller) {
          controller.terminate()
        }
      })
    )
    return textStream
  } catch (error) {
    console.error('Error in sendUserMessage:', error)
    return undefined
  }
}
