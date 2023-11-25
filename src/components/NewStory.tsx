import { useState, useEffect, useContext, useRef } from "react"
import { Web3AuthContext } from "../context/Web3AuthContext"
import { useStories } from "../context/StoriesContext"
import { closeStory, newStory } from "../service/handleStory"

export const NewStory = () => {
  const isFirstRender = useRef(true)
  const { stories, setStories } = useStories()
  const [isClicked, setIsClicked] = useState(false)
  const web3authContext = useContext(Web3AuthContext)
  if (!web3authContext) {
    throw new Error("Web3AuthContext is null")
  }
  const { isLoggedIn } = web3authContext

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const fetchData = async () => {
      try {
        for (let i = 0; i < stories.length; i++) {
          if (stories[i].isopen === true) {
            await closeStory(stories[i].uid)
            break
          }
        }
        const storyData = await newStory()
        setStories(storyData)
      } catch (error) {
        console.error("Error fetching stories: ", error)
      }
    }
    fetchData()
  }, [isClicked])

  return (
    <>
      {isLoggedIn ? (
        <button className="btn" onClick={() => setIsClicked(!isClicked)}>
          新しい物語をはじめる
        </button>
      ) : null}
    </>
  )
}
