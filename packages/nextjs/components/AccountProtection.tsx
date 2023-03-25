import { Header } from './Header'
import { RainbowKitCustomConnectButton } from './scaffold-eth'
import { useAccount } from 'wagmi'

type AccountProtectionProps = {
  children: React.ReactElement
}

export default function AccountProtection({ children }: AccountProtectionProps) {
  const { status, address } = useAccount()

  if (status === 'connecting') {
    return (
      <div
        className="flex flex-col items-center justify-center space-y-4"
        style={{ height: `calc(100vh - ${Header.HEIGHT}px)` }}
      >
        <div>Loading...</div>
      </div>
    )
  }

  if (!address) {
    return (
      <div
        className="flex flex-col items-center justify-center space-y-4"
        style={{ height: `calc(100vh - ${Header.HEIGHT}px)` }}
      >
        <div>Please connect your wallet to get started</div>
        <RainbowKitCustomConnectButton />
      </div>
    )
  }

  if (address) {
    return children
  }

  return null
}
