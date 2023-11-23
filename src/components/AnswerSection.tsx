import { StoredValues } from "../common/types"
import { useContext } from "react"
import { Web3AuthContext } from "../context/Web3AuthContext"

export const AnswerSection = ({ storedValues }: StoredValues) => {
  const web3authContext = useContext(Web3AuthContext)
  if (!web3authContext) {
    throw new Error("Web3AuthContext is null")
  }
  const { isLoggedIn } = web3authContext
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      {isLoggedIn ? (
        <div className="answer-container">
          <div className="answer-section">
            {storedValues.map((value: any, index: any) => {
              return (
                <>
                  <hr className="hr-line" />
                  <div className="answer-section" key={index}>
                    <p className="question">{value.question}</p>
                    <p className="answer">{value.answer}</p>
                    <div className="copy-icon" onClick={() => copyText(value.answer)}>
                      <p>Copy</p>
                      <i className="fa-solid fa-copy"></i>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  )
}
