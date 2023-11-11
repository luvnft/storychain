import type { NextPage } from "next"
import { OpenAI } from "openai"
import { useState } from "react"
import { StoredValue } from "../common/types"
import { Header } from "components/Header"
import { StoryReader } from "components/StoryReader"
import { InputSection } from "components/InputSection"
import { AnswerSection } from "components/AnswerSection"

const Home: NextPage = () => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  const [storedValues, setStoredValues] = useState<StoredValue[]>([])

  const generateResponse = async (queue: any, setQueue: any) => {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `You are a novelist. Based on the Japanese short sentences you will now input, please output a part of a novel. The part of the novel must satisfy the conditions of being "more than 50 characters but less than 200 characters in length" and "in Japanese." The Japanese short sentence is ${queue}.`,
        },
      ],
      model: "gpt-4",
    })

    if (chatCompletion.choices) {
      setStoredValues([
        {
          question: queue,
          answer: chatCompletion.choices[0].message.content?.toString(),
        },
        ...storedValues,
      ])
      setQueue("")

      // JSONファイルに保存
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 1,
          content: chatCompletion.choices[0].message.content?.toString(),
          updatedAt: new Date().toISOString(),
        }),
      })

      const data = await res.json()

      // for dev use
      console.log(chatCompletion)
      console.log(data)
    }
  }

  return (
    <div>
      <Header />
      <StoryReader />
      <InputSection generateResponse={generateResponse} />
      <AnswerSection storedValues={storedValues} />
    </div>
  )
}

export default Home
