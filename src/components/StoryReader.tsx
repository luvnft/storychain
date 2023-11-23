import { useState, useEffect, useContext } from "react"
import { Story } from "../common/types"
import { fetchStories } from "../service/handleStory"
import { Web3AuthContext } from "../context/Web3AuthContext"
import { useStories } from "../context/StoriesContext"

export const StoryReader = () => {
  const { stories, setStories } = useStories()
  const web3authContext = useContext(Web3AuthContext)
  if (!web3authContext) {
    throw new Error("Web3AuthContext is null")
  }
  const { isLoggedIn } = web3authContext

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storyData = await fetchStories()
        setStories(storyData)
      } catch (error) {
        console.error("Error fetching stories: ", error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {isLoggedIn ? (
        <div>
          <h2 className="story-section">さあ、物語の続きを書きましょう</h2>
          <ul>
            {stories !== undefined
              ? stories.map((story: Story) => (
                  <p className="story" key={story.uid}>
                    {/* <h2>{story.title}</h2> */}
                    {story.isopen ? story.content : null}
                  </p>
                ))
              : null}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}
