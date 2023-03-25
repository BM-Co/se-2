import clsx from 'clsx'
import { useAccount } from 'wagmi'
import { RainbowKitCustomConnectButton } from '~~/components/scaffold-eth'

const HEADER_HEIGHT = 64

type HeaderProps = {
  className?: string
  style?: React.CSSProperties
}

export function Header({ className, style = {} }: HeaderProps) {
  const { isConnected } = useAccount()

  return (
    <div
      className={clsx('flex items-center space-x-4 px-4 py-2', className)}
      style={{ height: HEADER_HEIGHT, ...style }}
    >
      <img src="/logo.svg" className="h-12 w-12 rounded-md border" />
      <div className="flex-1" />
      {isConnected ? <RainbowKitCustomConnectButton /> : null}
    </div>
  )
}

Header.HEIGHT = HEADER_HEIGHT
