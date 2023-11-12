import React, { createContext, useState, useContext } from "react"
import { Story } from "../common/types"

const StoriesContext = createContext({
  stories: [] as Story[],
  setStories: (stories: Story[]) => {},
})

export const StoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [stories, setStories] = useState<Story[]>([])

  return (
    <StoriesContext.Provider value={{ stories, setStories }}>{children}</StoriesContext.Provider>
  )
}

export const useStories = () => useContext(StoriesContext)
