import { getAttestation } from "core/attestation"

export const Attetation = () => {
  return (
    <button className="btn" onClick={() => getAttestation()}>
      Get Attestation
    </button>
  )
}
