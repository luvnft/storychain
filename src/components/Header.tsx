import { UserAddress } from "./UserAddress"
import { useState } from "react"
import { SendUserOperation } from "./SendUserOperation"
import { Attetation } from "./Attestation"
import { UserAttestation } from "./UserAttestation"
import { Logout } from "./Logout"

export const Header = () => {
  const [loginStatus, setLoginStatus] = useState(false)

  return (
    <div className="header-section">
      <h1>StoryChain</h1>
      <br />
      <SendUserOperation onClick={() => setLoginStatus(true)} logingStatus={loginStatus} />
      <br />
      <br />
      <UserAddress />
      <br />
      <br />
      <Attetation />
      <br />
      <br />
      <UserAttestation />
      <br />
      <br />
      <Logout />
      <br />
      <br />
      <p>
        「StoryChain」は、共創の精神とAIの力を組み合わせた画期的な小説作成サービスです。
        参加者が投稿した短文から、OpenAIが魅力的な物語を紡ぎ出します。
        すべての寄稿はブロックチェーンに記録され、創造の瞬間が永遠に保たれます。
        あなたもStoryChainで、次世代の物語作りに参加しましょう。
      </p>
    </div>
  )
}
