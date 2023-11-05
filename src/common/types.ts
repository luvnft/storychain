export type StoredValue = {
  question: string
  answer: string | undefined
}

export type StoredValues = {
  storedValues: StoredValue[]
}

export interface IStory {
  id: number
  title: string
  content: string
  slug: string
  createdAt: string
  updatedAt: string
}
