import { UserAddress } from "./UserAddress"
import { useState } from "react"
import { SendUserOperation } from "./SendUserOperation"
import { Attetation } from "./Attestation"
import { UserAttestation } from "./UserAttestation"
import { UserStatus } from "./UserStatus"

export const Header = () => {
  const [loginStatus, setLoginStatus] = useState(false)

  return (
    <>
      <div className="button-container">
        <UserAddress />
        <UserAttestation />
        <UserStatus />
      </div>
      <div className="header-section">
        <img src="./images/send-ence_icon.png" alt="title" width={350} />
        {/* <h1>Send-ence</h1> */}
        <p>
          「Send-ence」では、あなたとAIの力を組み合わせて物語を創作します。<br />
          すでにある物語の続きとして、あなたが文章を入力すると、AIが物語の続きを生成します。<br />
          そして物語はブロックチェーンに記録され、創造の瞬間が永遠に保たれるのです。<br />
        </p>
      </div>
    </>
  )
}
