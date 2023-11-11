import { UserAddress } from "components/UserAddress"
import { useState } from "react"
import { SendUserOperation } from "./SendUserOperation"

export const Header = () => {
  const [loginStatus, setLoginStatus] = useState(false)

  return (
    <div className="header-section">
      <h1>StoryChain</h1>
      <SendUserOperation onClick={() => setLoginStatus(true)} logingStatus={loginStatus} />
      <UserAddress />
      <p>
        「StoryChain」は、共創の精神とAIの力を組み合わせた画期的な小説作成サービスです。
        参加者が投稿した短文から、OpenAIが魅力的な物語を紡ぎ出します。
        すべての寄稿はブロックチェーンに記録され、創造の瞬間が永遠に保たれます。
        あなたもStoryChainで、次世代の物語作りに参加しませんか？
      </p>
    </div>
  )
}
