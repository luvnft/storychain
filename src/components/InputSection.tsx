import { useState } from "react"

export const InputSection = ({ generateResponse }: any) => {
  const [queue, setQueue] = useState("")

  return (
    <div className="form-section">
      <textarea
        rows={5}
        className="form-control"
        placeholder="物語を紡ぎ出すための短文を入力してください。"
        value={queue}
        onChange={(e) => setQueue(e.target.value)}
      ></textarea>
      <button className="btn" onClick={() => generateResponse(queue, setQueue)}>
        物語を紡ぐ
      </button>
    </div>
  )
}
