import { OpenAI } from "openai"
import { generateNovel } from "config/prompt/generateNovel"
import { Queue, UserNovelData } from "common/types"
import { fetchStories } from "service/handleStory"
import { getNovelAttestation } from "core/attestation"

let userNovelData: UserNovelData = {
  previousContent: "",
  inputSentence: "",
  outputContent: "",
  storyId: 0,
}

type NovelResponse = {
  openAiResponse: string
  storyId: number
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

export const generateResponse = async (queue: string): Promise<UserNovelData | undefined> => {
  const previousContent = await fetchStories()

  for (let i = 0; i < previousContent.length; i++) {
    if (previousContent[i].isopen) {
      userNovelData.storyId = previousContent[i].uid
      userNovelData.previousContent =
        previousContent[i].content === null ? "" : previousContent[i].content
      break
    }
  }

  userNovelData.inputSentence = queue === null ? "" : queue

  const requestData: Queue = {
    newSentence: userNovelData.inputSentence,
    priviousSentence: userNovelData.previousContent,
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
    await getNovelAttestation(userNovelData)
    return userNovelData
  }
}

export const saveContent = async (response: UserNovelData): Promise<any> => {
  // JSONファイルへの保存ロジック
  const res = await fetch("/api/story/updatecontent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: response.storyId,
      content: response.outputContent,
    }),
  })

  const data = await res.json()
}
