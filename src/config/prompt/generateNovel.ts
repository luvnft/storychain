import { Queue } from "common/types"

export const generateNovel = (props: Queue) => {
  return `
  You are a novelist who writes Japanese novels.
  Based on the following "newSentenct", please write a part of a novel.
  However, the part of the novel you write must be a continuation of priviousSentence and must be between 50 and 200 Japanese characters in length. 
  Then, connect newSentence to priviousSentence and output it in Japanese.
  \`\`\` newSentence
    ${props.newSentence}
  \`\`\`
  \`\`\` priviousSentence
    ${props.priviousSentence}
  \`\`\`
    `
}
