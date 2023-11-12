import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import path from "path"
import { Data, Story } from "common/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const filePath = path.join(process.cwd(), "src/pages/api/story/data", "story.json")
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"))
  const stories = data.story

  if (req.method === "POST") {
    try {
      const newId = stories.length + 1

      // 新しい物語を追加
      const newStory: Story = {
        id: newId,
        title: "",
        slug: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: "",
        isOpen: true,
      }

      stories.push(newStory)

      fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8", (err) => {
        if (err) {
          res.status(500).json({ message: "Error writing file" })
          return
        }
        res.status(200).json({ message: "New story added successfully" })
      })
    } catch (err) {
      res.status(500).json({ message: "Error adding new story" })
    }
  } else if (req.method === "GET") {
    // 既存のGET処理をそのまま使用
    stories.sort((a: Story, b: Story) => {
      return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
    })
    res.status(200).json(data)
  }
}
