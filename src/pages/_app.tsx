import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Web3AuthProvider } from "../components/Web3AuthProvider"
import { StoriesProvider } from "context/StoriesContext"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3AuthProvider>
      <StoriesProvider>
        <Component {...pageProps} />
      </StoriesProvider>
    </Web3AuthProvider>
  )
}

export default MyApp
