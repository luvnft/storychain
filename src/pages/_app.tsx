import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Web3AuthProvider } from "../components/Web3AuthProvider"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3AuthProvider>
      <Component {...pageProps} />
    </Web3AuthProvider>
  )
}

export default MyApp
