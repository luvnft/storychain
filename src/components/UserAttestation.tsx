import { getSenderWithW3A } from "core/senderWithW3A"
import { useEffect, useState } from "react"

export const UserAttestation = () => {
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const redirectTo = async () => {
      if (isClicked) {
        const senderAddress = await (await getSenderWithW3A()).getAddress()
        const redirectUrl = `https://polygon-mumbai.easscan.org/address/${senderAddress}`
        window.open(redirectUrl, "_blank") // 新しいタブでURLを開く
      }
    }

    redirectTo()
  }, [isClicked]) // isClickedが変更されたときにuseEffectをトリガー

  return (
    <button className="btn" onClick={() => setIsClicked(true)}>
      See your attestations
    </button>
  )
}
