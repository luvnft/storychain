import {
  LightSmartContractAccount,
  getDefaultLightAccountFactoryAddress,
} from "@alchemy/aa-accounts"
import { AlchemyProvider } from "@alchemy/aa-alchemy"
import { LocalAccountSigner, type SmartAccountSigner } from "@alchemy/aa-core"
import { polygonMumbai } from "viem/chains"
import { getWeb3AuthSigner } from "./web3Auth"

export const getSenderWithW3A = async () => {
  const chain = polygonMumbai
  const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY_MUMBAI
  // https://docs.alchemy.com/reference/eth-supportedentrypoints
  const ENTRYPOINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"

  const web3authSigner: SmartAccountSigner = await getWeb3AuthSigner()

  // Create a provider with your EOA as the smart account owner, this provider is used to send user operations from your smart account and interact with the blockchain
  const provider = new AlchemyProvider({
    // apiKey: ALCHEMY_API_KEY,
    rpcUrl: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`, // or replace with your Alchemy API key, you can get one at https://dashboard.alchemy.com/
    chain,
    // Entrypoint address, you can use a different entrypoint if needed, check out https://docs.alchemy.com/reference/eth-supportedentrypoints for all the supported entrypoints
    // entryPointAddress: ENTRYPOINT_ADDRESS,
  }).connect(
    (rpcClient) =>
      new LightSmartContractAccount({
        // entryPointAddress: ENTRYPOINT_ADDRESS,
        chain,
        owner: web3authSigner,
        factoryAddress: getDefaultLightAccountFactoryAddress(rpcClient.chain), // Default address for Light Account on Sepolia, you can replace it with your own.
        rpcClient,
      })
  )

  provider.withAlchemyGasManager({
    policyId: process.env.NEXT_PUBLIC_GAS_MANAGER_POLICY_ID_MUMBAI as string,
  })

  return provider
}
