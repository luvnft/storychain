export const fetchStories = async () => {
  try {
    const response = await fetch("/api/story/getcontents")

    if (!response.ok) {
      throw new Error("Network response was not ok.")
    }

    const data = await response.json()
    return data.novels.rows
  } catch (error) {
    console.error("Fetch error: ", error)
    throw error
  }
}

export const closeStory = async (id: number) => {
  try {
    const response = await fetch("/api/story/closestory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: id }),
    })

    if (!response.ok) {
      const errorResponse = await response.json()
      throw new Error("Network response was not ok.: " + errorResponse.message)
    }

    const data = await response.json()
    return data.story
  } catch (error) {
    console.error("Fetch error: ", error)
    throw error
  }
}

export const newStory = async () => {
  try {
    const response = await fetch("/api/story/addnewstory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "" }),
    })

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
