import { useState, useContext } from "react"
import { Web3AuthContext } from "../context/Web3AuthContext"

export const InputSection = ({ generateResponse }: any) => {
  const [queue, setQueue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const web3authContext = useContext(Web3AuthContext)
  if (!web3authContext) {
    throw new Error("Web3AuthContext is null")
  }
  const { isLoggedIn } = web3authContext

  const handleGenerateResponse = async (queue: string) => {
    setIsLoading(true)
    try {
      await generateResponse(queue, setQueue)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoggedIn ? (
        <div className="form-section">
          <textarea
            rows={5}
            className="form-control"
            placeholder="物語の続きとなる文章を入力しましょう。"
            value={queue}
            onChange={(e) => setQueue(e.target.value)}
          ></textarea>
          <button className="btn-input" onClick={() => handleGenerateResponse(queue)}>
            {isLoading ? (
              <span className="button-content">
                <div className="spinner"></div>
                <span>読み込み中...</span>
              </span>
            ) : (
              <span>物語の続きを作成する</span>
            )}
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}
