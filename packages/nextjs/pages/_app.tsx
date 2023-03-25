import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { WagmiConfig } from 'wagmi'
import AccountProtection from '~~/components/AccountProtection'
import { Header } from '~~/components/Header'
import { BlockieAvatar } from '~~/components/scaffold-eth'
import { useEthPrice } from '~~/hooks/scaffold-eth'
import { useAppStore } from '~~/services/store/store'
import { wagmiClient } from '~~/services/web3/wagmiClient'
import { appChains } from '~~/services/web3/wagmiConnectors'
import '~~/styles/globals.css'

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const price = useEthPrice()
  const setEthPrice = useAppStore((state) => state.setEthPrice)

  useEffect(() => {
    if (price > 0) {
      setEthPrice(price)
    }
  }, [setEthPrice, price])

  return (
    <WagmiConfig client={wagmiClient}>
      <NextNProgress />
      <RainbowKitProvider chains={appChains.chains} avatar={BlockieAvatar}>
        <AccountProtection>
          <>
            <Header className="fixed top-0 left-0 right-0" />
            <div style={{ paddingTop: Header.HEIGHT }}>
              <Component {...pageProps} />
            </div>
          </>
        </AccountProtection>
        <Toaster
          toastOptions={{
            duration: 100000,
            className: 'flex items-center',
          }}
        />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default ScaffoldEthApp
