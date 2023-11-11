import { useState, useEffect } from "react"
import { Story } from "../common/types"
import { fetchStories } from "../service/readStory"

export const StoryReader = () => {
  const [stories, setStories] = useState([])

  // コンポーネントがマウントされた時に実行される
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
    <div>
      <h2 className="story-section">紡ぐ物語</h2>
      <ul>
        {stories.map((story: Story) => (
          <p key={story.id}>
            {/* <h2>{story.title}</h2> */}
            {story.content}
          </p>
        ))}
      </ul>
    </div>
  )
}
