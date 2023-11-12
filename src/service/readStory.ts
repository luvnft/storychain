export const fetchStories = async () => {
  try {
    const response = await fetch("/api/story/content")

    if (!response.ok) {
      throw new Error("Network response was not ok.")
    }
    
    const data = await response.json()
    return data.story
  } catch (error) {
    console.error("Fetch error: ", error)
    throw error
  }
}
