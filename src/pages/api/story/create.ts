import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@vercel/postgres"

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const client = await db.connect()

  try {
    await client.sql`
      CREATE TABLE novels (
        uid SERIAL PRIMARY KEY,
        title VARCHAR(255),
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        content TEXT,
        isOpen BOOLEAN NOT NULL
    );
    `

    await client.sql`
      INSERT INTO novels (title, createdAt, updatedAt, content, isOpen)
      VALUES
        ('The First Story', '2019-01-03T00:00:00.000Z', '2023-11-12T08:24:44.060Z', '彼女は夏の熱気に苛まれながら、静かな風を待った。窓から差し込む日差しにはまだ昼の力強さが感じられ、部屋の中は夏の高温で息苦しかった。すると、うわさのおばあちゃんが部屋のドアを開けた。「おーい、お茶」と声をかけ、手に持った茶器からほっとするような湯気が立っている。', false),
        ('The Secont Story', '2019-01-03T00:00:00.000Z', '2023-11-12T07:25:41.440Z', '彼が見たものは、非常に鮮やかな衣装を身に纏った豪華な女性だった。「おほほほ」と笑みを浮かべていたその女性は、自分が探し求めていた次のコンテントのヒントかもしれないと思い、彼はその場に立ち尽くした。彼女の笑顔には何か特別なものがあった。その光景に心を奪われ、彼はまた新たな物語を紡ぎ出す決意を固めた。そして、「この美しい笑顔を形にする。これが次のコンテントだ」と彼は密かに決意を新たにしたのだった。「おほほほ」その言葉は、彼の心の中で反響し、新たな物語へと彼を導いた。', false),
        ('The Secont Story', '2019-01-03T00:00:00.000Z', '2023-11-12T08:03:22.613Z', 'Oufhu彼が見たものは、非常に鮮やかな衣装を身に纏った豪華な女性だった。「おほほほ」と笑みを浮かべていたその女性は、自分が探し求めていた次のコンテントのヒントかもしれないと思い、彼はその場に立ち尽くした。彼女の笑顔には何か特別なものがあった。その光景に心を奪われ、彼はまた新たな物語を紡ぎ出す決意を固めた。そして、「この美しい笑顔を形にする。これが次のコンテントだ」と彼は密かに決意を新たにしたのだった。「おほほほ」その言葉は、彼の心の中で反響し、新たな物語へと彼を導いた。', true);
    `
  } catch (error) {
    return response.status(500).json({ error })
  }

  const novels = await client.sql`SELECT * FROM novels;`
  client.release()
  return response.status(200).json({ novels })
}
