import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import path from "path"
import { error } from "console"
import { Data, Story, Stories } from "common/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const filePath = path.join("/tmp", "story.json")
    const stories = JSON.parse(fs.readFileSync(filePath, "utf-8"))
    if (req.method === "POST") {
      try {
        const storyIndex = stories.story.findIndex((story: Story) => story.id === req.body.id)
        if (storyIndex === -1) {
          return res.status(404).json({ message: "Story not found" })
        }

        stories.story[storyIndex].isOpen = false
        stories.story[storyIndex].updatedAt = new Date().toISOString()

        fs.writeFile(filePath, JSON.stringify(stories, null, 1), "utf8", (err) => {
          if (err) {
            res.status(500).json({ message: "Error writing file" })
            return
          }

          res.status(200).json({ message: "Story updated successfully" })
        })
      } catch (err) {
        res.status(500).json({ message: "Error updating story" })
      }
    } else if (req.method == "GET") {
      stories.story.sort((a: any, b: any) => {
        return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      })
      res.status(200).json(stories)
    }
  } catch (error) {
    console.error("Fetch error: ", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
