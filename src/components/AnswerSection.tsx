import { StoredValues } from "../common/types"

export const AnswerSection = ({ storedValues }: StoredValues) => {
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <hr className="hr-line" />
      <div className="answer-container">
        <div className="answer-section">
          {storedValues.map((value: any, index: any) => {
            return (
              <div className="answer-section" key={index}>
                <p className="question">{value.question}</p>
                <p className="answer">{value.answer}</p>
                <div className="copy-icon" onClick={() => copyText(value.answer)}>
                  <p>Copy</p>
                  <i className="fa-solid fa-copy"></i>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
