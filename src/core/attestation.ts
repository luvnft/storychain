import { SendUserOperationResult } from "@alchemy/aa-core"
import { getSenderWithW3A } from "./senderWithW3A"
import { encodeFunctionData } from "viem"
import { easContractAbi } from "abi/eas.abi"
import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk"

export const getAttestation = async () => {
  const sender = await getSenderWithW3A()
  sender.getAddress().then((address: string) => console.log("sender address: ", address))

  const targetAddress = await sender.getAddress()

  const EASContractAddress = "0xaEF4103A04090071165F78D45D83A0C0782c2B2a"

  const schemaUid = `0x704b406c21b10224da484fcf3cef2166ad087c5df89efb81091883941971db4e`
  const schemaEncoder = new SchemaEncoder("bool whitelist")
  const encodedData = schemaEncoder.encodeData([{ name: "whitelist", type: "bool", value: true }])

  const result: SendUserOperationResult = await sender.sendUserOperation({
    target: EASContractAddress,
    data: encodeFunctionData({
      abi: easContractAbi,
      functionName: "attest",
      args: [
        {
          schema: schemaUid, // bytes32型
          data: {
            recipient: targetAddress, // address型
            expirationTime: 0, // uint64型
            revocable: true, // bool型
            refUID: "0x0000000000000000000000000000000000000000000000000000000000000000", // bytes32型のデフォルト値
            data: encodedData, // bytes型
            value: 0, // uint256型
          },
        },
      ],
    }),
  })

  console.log("User operation result: ", result)
  console.log("\nWaiting for the user operation to be included in a mined transaction...")

  const txHash = await sender.waitForUserOperationTransaction(result.hash as `0x${string}`)
  console.log("\nTransaction hash: ", txHash)

  const userOpReceipt = await sender.getUserOperationReceipt(result.hash as `0x${string}`)
  console.log("\nUser operation receipt: ", userOpReceipt)

  const txReceipt = await sender.rpcClient.waitForTransactionReceipt({
    hash: txHash,
  })
  console.log("\nTransaction receipt: ", txReceipt)

  // await logoutWeb3Auth()
}
