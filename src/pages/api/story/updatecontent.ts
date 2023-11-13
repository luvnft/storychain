import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@vercel/postgres"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await db.connect()

  const uid = req.body.uid
  const content = req.body.content

  try {
    await client.sql`
      UPDATE novels 
      SET content = ${content} WHERE uid = ${uid} AND isopen = true;
    `
    return res.status(200)
  } catch (error) {
    return res.status(500).json({ error })
  } finally {
    client.release()
  }
}
