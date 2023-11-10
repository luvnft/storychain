import { AlchemyProvider } from "@alchemy/aa-alchemy"
import { WalletClientSigner, type SmartAccountSigner } from "@alchemy/aa-core"
import { Web3Auth } from "@web3auth/modal"
import { sepoliaChainConfig } from "config/w3aChainConfig"
import { createWalletClient, custom } from "viem"

const getWeb3Auth = async () => {
  const web3auth = new Web3Auth({
    clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID as string,
    web3AuthNetwork: "sapphire_mainnet", // Web3Auth Network
    chainConfig: sepoliaChainConfig,
  })

  await web3auth.initModal()
  await web3auth.connect()

  return web3auth
}

export const getWeb3AuthClient = async () => {
  const web3auth = await getWeb3Auth()

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
  const web3authClient = await getWeb3AuthClient()

  // a smart account signer you can use as an owner on ISmartContractAccount
  const web3authSigner: SmartAccountSigner = new WalletClientSigner(
    web3authClient,
    "web3auth" // signerType
  )

  return web3authSigner
}

export const logoutWeb3Auth = async () => {
  const web3auth = await getWeb3Auth()
  web3auth
    .logout()
    .then(() => console.log("web3auth logged out"))
    .catch((err) => console.error("web3auth logout error: ", err))
}
