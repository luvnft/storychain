import { useContext } from "react"
import { Web3AuthContext } from "../context/Web3AuthContext"

export const UserStatus = () => {
  const web3authContext = useContext(Web3AuthContext)
  if (!web3authContext) {
    throw new Error("Web3AuthContext is null")
  }
  const { isLoggedIn, login, logout } = web3authContext

  const handleLogin = async () => {
    const msg = await login()
    // alert(msg)
  }

  const handleLogout = async () => {
    const msg = await logout()
    alert(msg)
  }

  return (
    <>
      {isLoggedIn ? (
        <button className="btn" onClick={handleLogout}>
          ログアウト
        </button>
      ) : (
        <button className="btn" onClick={handleLogin}>
          ログイン
        </button>
      )}
    </>
  )
}
