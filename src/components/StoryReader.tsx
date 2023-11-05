import { useState, useEffect } from "react"
import { IStory } from "../common/types"

export const StoryReader = () => {
  const [stories, setStories] = useState([])

  // コンポーネントがマウントされた時に実行される
  useEffect(() => {
    fetch("/api") // JSONファイルのパスを指定
      .then((response) => {
        console.log(response)
        if (response.ok) {
          return response.json() // JSONデータをJavaScriptオブジェクトに変換
        }
        throw new Error("Network response was not ok.")
      })
      .then((data) => setStories(data.story)) // 状態を更新
      .catch((error) => console.error("Fetch error: ", error))
  }, [])

  return (
    <div>
      <h2 className="story-section">紡ぐ物語</h2>
      <ul>
        {stories.map((story: IStory) => (
          <p key={story.id}>
            {/* <h2>{story.title}</h2> */}
            {story.content}
          </p>
        ))}
      </ul>
    </div>
  )
}
