import { WalletClientSigner, type SmartAccountSigner } from "@alchemy/aa-core"
import { Web3Auth } from "@web3auth/modal"
import { createWalletClient, custom } from "viem"

const getWeb3Auth = () => {
  const web3auth = new Web3Auth({
    clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID as string,
    web3AuthNetwork: "sapphire_mainnet", // Web3Auth Network
    chainConfig: {
      chainNamespace: "eip155",
      chainId: "0x11155111",
      rpcTarget: "https://sepolia.infura.io/v3/",
      displayName: "Sepolia test network",
      blockExplorer: "https://sepolia.etherscan.io",
      ticker: "SepoliaETH",
      tickerName: "Sepolia",
    },
  })
  return web3auth
}

export const getWeb3AuthClient = async () => {
  const web3auth = getWeb3Auth()
  await web3auth.initModal()
  await web3auth.connect()

  if (web3auth.provider === null) {
    throw new Error("web3auth.provider is null")
  }

  // a viem wallet client that wraps web3auth for utility methods
  // NOTE: this isn't necessary since you can just use the `web3auth.rpcProvider`
  // directly, but this makes things much easier
  const web3authClient = createWalletClient({
    transport: custom(web3auth.provider),
  })

  return web3authClient
}

export const getWeb3AuthSigner = async () => {
  const web3auth = getWeb3Auth()
  await web3auth.initModal()
  await web3auth.connect()

  if (web3auth.provider === null) {
    throw new Error("web3auth.provider is null")
  }

  const web3authClient = await getWeb3AuthClient()

  // a smart account signer you can use as an owner on ISmartContractAccount
  const web3authSigner: SmartAccountSigner = new WalletClientSigner(
    web3authClient,
    "web3auth" // signerType
  )

  return web3authSigner
}
