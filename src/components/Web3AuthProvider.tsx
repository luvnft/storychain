// Web3AuthProvider.js
import { useState, useEffect } from "react"
import { Web3AuthContext } from "../context/Web3AuthContext"
import { Web3Auth } from "@web3auth/modal"
import { mumbaiChainConfig } from "config/w3aChainConfig"

export const Web3AuthProvider = ({ children }: any) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID_MUMBAI as string

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          web3AuthNetwork: "sapphire_devnet",
          chainConfig: mumbaiChainConfig,
        })

        setWeb3auth(web3auth)
        await web3auth.initModal()
      } catch (error) {
        console.error(error)
      }
    }

    init()
  }, [])

  const login = async () => {
    if (!web3auth) {
      return "Web3Authが初期化されていません。"
    }
    try {
      await web3auth.connect()
      setIsLoggedIn(true)
      return "ログインに成功しました。"
    } catch (error) {
      console.error("Login failed", error)
      setIsLoggedIn(false)
      return "ログインに失敗しました。"
    }
  }

  const authenticateUser = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet")
      return
    }
    const idToken = await web3auth.authenticateUser()
    uiConsole(idToken)
  }

  const getUserInfo = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet")
      return
    }
    const user = await web3auth.getUserInfo()
    uiConsole(user)
  }

  const logout = async () => {
    if (!web3auth) {
      return "Web3Authが初期化されていません。"
    }
    try {
      await web3auth.logout()
      setIsLoggedIn(false)
      return "ログアウトに成功しました。"
    } catch (error) {
      console.error("Logout failed", error)
      setIsLoggedIn(true)
      return "ログアウトに失敗しました。"
    }
  }

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p")
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2)
    }
  }

  return (
    <Web3AuthContext.Provider
      value={{ web3auth, isLoggedIn, login, logout, authenticateUser, getUserInfo }}
    >
      {children}
    </Web3AuthContext.Provider>
  )
}
