import { ChainId, DAppProvider } from '@usedapp/core'
import '../styles/globals.css'

const config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/7d0d81d0919f4f05b9ab6634be01ee73',
  },
  pollingInterval: 10000
}

function MyApp({ Component, pageProps }) {
  return <DAppProvider config={config}>
    <Component {...pageProps} />
  </DAppProvider>
}

export default MyApp
