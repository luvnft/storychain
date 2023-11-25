import { SendUserOperationResult } from "@alchemy/aa-core"
import { parseEther } from "viem"
import { getSenderWithW3A } from "./senderWithW3A"

export const sendUserOperation = async () => {
  const sender = await getSenderWithW3A()
  sender.getAddress().then((address: string) => console.log("sender address: ", address))

  const targetAddress = "56a4975de8F187667AfDd1DBde72cf6CF88BfBb4"
  const amountToSend: bigint = parseEther("0.0001")

  const result: SendUserOperationResult = await sender.sendUserOperation({
    target: `0x${targetAddress}`,
    data: "0x",
    value: amountToSend,
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
}
