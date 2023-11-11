import type { NextPage } from "next"
import { Header } from "components/Header"
import { StoryReader } from "components/StoryReader"
import { InputSection } from "components/InputSection"
import { AnswerSection } from "components/AnswerSection"
import { useStoredValues } from "hooks/useStoredValues"

const Home: NextPage = () => {
  const { storedValues, handleGenerateResponse } = useStoredValues()

  return (
    <div>
      <Header />
      <StoryReader />
      <InputSection generateResponse={handleGenerateResponse} />
      <AnswerSection storedValues={storedValues} />
    </div>
  )
}

export default Home
