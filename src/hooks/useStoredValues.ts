import { useState } from "react"
import { StoredValue } from "../common/types"
import { generateResponse, saveContent } from "../service/openAiService"

export const useStoredValues = () => {
  const [storedValues, setStoredValues] = useState<StoredValue[]>([])

  const handleGenerateResponse = async (queue: string) => {
    const response = await generateResponse(queue)
    if (response) {
      setStoredValues([...storedValues, { question: queue, answer: response.outputContent }])
      saveContent(response)
    }
  }

  return { storedValues, handleGenerateResponse }
}
