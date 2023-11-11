import { log } from "console"
import { sendUserOperation } from "core/userOperation"

export const SendUserOperation = (props: any) => {
  const loginStatus = props.loginStatus
  if (loginStatus) {
    return <button onClick={() => sendUserOperation()}>Send User Operation</button>
  } else {
    return <button onClick={() => sendUserOperation()}>Send User Operation</button>
  }
}
