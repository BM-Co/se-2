import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FaEthereum } from 'react-icons/fa'
import { Balance, BlockieAvatar } from '~~/components/scaffold-eth'
import { TAutoConnect, useAutoConnect, useNetworkColor } from '~~/hooks/scaffold-eth'
import { getTargetNetwork } from '~~/utils/scaffold-eth'

// todo: move this later scaffold config.  See TAutoConnect for comments on each prop
const tempAutoConnectConfig: TAutoConnect = {
  enableBurnerWallet: true,
  autoConnect: true,
}

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButton = () => {
  useAutoConnect(tempAutoConnectConfig)

  const networkColor = useNetworkColor()
  const configuredNetwork = getTargetNetwork()

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, openChainModal, mounted }) => {
        const connected = mounted && account && chain

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <button className="btn-primary btn space-x-2" onClick={openConnectModal} type="button">
                    <FaEthereum className="h-5 w-5" />
                    <span>Connect Wallet</span>
                  </button>
                )
              }

              if (chain.unsupported || chain.id !== configuredNetwork.id) {
                return (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs" style={{ color: networkColor }}>
                      {configuredNetwork.name}
                    </span>
                    <button className="btn-error btn" onClick={openChainModal} type="button">
                      <span>Wrong network</span>
                      <ChevronDownIcon className="h-5 w-5" />
                    </button>
                  </div>
                )
              }

              return (
                <div className="flex items-center justify-end space-x-2">
                  <Balance address={account.address} className="h-auto min-h-0" />
                  <span className="text-xs font-medium" style={{ color: networkColor }}>
                    {chain.name}
                  </span>
                  <button onClick={openAccountModal} type="button" className="btn space-x-2">
                    <BlockieAvatar address={account.address} size={20} ensImage={account.ensAvatar} />
                    <span className="text-sm">{account.displayName}</span>
                    <ChevronDownIcon className="h-5 w-5" />
                  </button>
                </div>
              )
            })()}
          </>
        )
      }}
    </ConnectButton.Custom>
  )
}
