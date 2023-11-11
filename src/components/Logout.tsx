import { logoutWeb3Auth } from "core/web3Auth"
import { useEffect, useState } from "react"

export const Logout = () => {
  return (
    <button className="btn" onClick={() => logoutWeb3Auth()}>
      Logout
    </button>
  )
}
