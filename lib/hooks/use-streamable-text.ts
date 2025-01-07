import { StreamableValue, readStreamableValue } from 'ai/rsc'
import { useEffect, useState } from 'react'

export const useStreamableText = (
  content: StreamableValue<string> | string
) => {
  const [rawContent, setRawContent] = useState(
    typeof content === 'string' ? content : ''
  )

  useEffect(() => {
    let isMounted = true

    ;(async () => {
      if (typeof content === 'object') {
        let value = ''
        for await (const delta of readStreamableValue(content)) {
          if (typeof delta === 'string' && isMounted) {
            setRawContent((value = delta))
          }
        }
      }
    })()

    return () => {
      isMounted = false
    }
  }, [content])

  return rawContent
}
