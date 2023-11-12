import { OpenAI } from "openai"
import { generateNovel } from "config/prompt/generateNovel"
import { Queue, UserNovelData } from "common/types"
import { fetchStories } from "service/readStory"
import { getNovelAttestation } from "core/attestation"

let userNovelData: UserNovelData = { previousContent: "", inputSentence: "", outputContent: "" }

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

export const generateResponse = async (queue: string): Promise<string | undefined> => {
  const previousContent = await fetchStories()
  userNovelData.previousContent = previousContent[0].content
  userNovelData.inputSentence = queue

  const requestData: Queue = {
    newSentence: queue,
    priviousSentence: previousContent[0].content,
  }

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: generateNovel(requestData),
      },
    ],
    model: "gpt-4",
  })

  if (chatCompletion.choices) {
    userNovelData.outputContent = chatCompletion.choices[0].message.content?.toString() as string
    // await getNovelAttestation(userNovelData)
    return chatCompletion.choices[0].message.content?.toString()
  }
}

export const saveContent = async (response: string): Promise<any> => {
  // JSONファイルへの保存ロジック
  const res = await fetch("/api/story/content", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 1,
      content: response,
      updatedAt: new Date().toISOString(),
    }),
  })

  const data = await res.json()
}
