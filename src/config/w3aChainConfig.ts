import { Web3AuthNoModalOptions } from "@web3auth/no-modal"
import { polygonMumbai, sepolia } from "viem/chains"

const ALCHEMY_API_KEY_SEPOLIA = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_SEPOLIA
const ALCHEMY_API_KEY_MUMBAI = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_MUMBAI

export const sepoliaChainConfig: Web3AuthNoModalOptions["chainConfig"] = {
  chainNamespace: "eip155",
  chainId: "0xaa36a7",
  rpcTarget: `${sepolia.rpcUrls.alchemy.http}/${ALCHEMY_API_KEY_SEPOLIA}`,
  displayName: "Sepolia Test Network",
  blockExplorer: "https://sepolia.etherscan.io/",
  ticker: "ETH",
  tickerName: "SepoliaETH",
}

export const mumbaiChainConfig: Web3AuthNoModalOptions["chainConfig"] = {
  chainNamespace: "eip155",
  chainId: "0x13881",
  rpcTarget: `${polygonMumbai.rpcUrls.alchemy.http}/${ALCHEMY_API_KEY_MUMBAI}`,
  displayName: "Matic Testnet Mumbai",
  blockExplorer: "https://mumbai.polygonscan.com/",
  ticker: "MTC",
  tickerName: "mumbaiMTC",
}
