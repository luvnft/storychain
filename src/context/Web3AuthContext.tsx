// Web3AuthContext.js
import React, { createContext, useState, useEffect } from "react"
import { Web3Auth } from "@web3auth/modal"
import { mumbaiChainConfig } from "config/w3aChainConfig"

type Web3AuthContextType = {
  web3auth: Web3Auth | null
  isLoggedIn: boolean
  login: () => Promise<string>
  logout: () => Promise<string>
  authenticateUser: () => Promise<any>
  getUserInfo: () => Promise<any>
}

export const Web3AuthContext = createContext<Web3AuthContextType | null>(null)
