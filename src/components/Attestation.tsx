import { getAttestation } from "core/attestation"
import { useSigner } from "hooks/eas-wagmi-utils"

export const Attetation = () => {
  return (
    <button className="btn" onClick={() => getAttestation()}>
      Get Attestation
    </button>
  )
}
