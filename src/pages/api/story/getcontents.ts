import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@vercel/postgres"

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const client = await db.connect()
  const novels = await client.sql`SELECT * FROM novels;`
  client.release()
  return response.status(200).json({ novels })
}
