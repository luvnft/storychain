import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@vercel/postgres"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await db.connect()

  const title = req.body.title

  try {
    await client.sql`
      INSERT INTO novels 
        (
          title,
          createdAt,
          updatedAt,
          isOpen
        )
      VALUES
        (
          ${title}, 
          current_timestamp,
          current_timestamp,
          true    
        );
    ` 
    return res.status(200)
  } catch (error) {
    return res.status(500).json({ error })
  } finally {
    client.release()
  }
}
