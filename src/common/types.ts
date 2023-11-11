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
  id: number
  title: string
  content: string
  inputSentence: string
  outputContent: string
  slug: string
  createdAt: string
  updatedAt: string
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
}
