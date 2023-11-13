export type StoredValue = {
  question: string
  answer: string | undefined
}

export type StoredValues = {
  storedValues: StoredValue[]
}

export type Data = {
  message: string
}

export type Story = {
  uid: number
  title: string
  content: string
  slug: string
  createdat: string
  updatedat: string
  isopen: boolean
}

export type Stories = {
  story: Story[]
}

export type Queue = {
  newSentence: string
  priviousSentence: string
}

export type UserNovelData = {
  previousContent: string
  inputSentence: string
  outputContent: string
  storyId: number
}
