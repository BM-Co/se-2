import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import WriteButton from './WriteButton'
import { RainbowKitCustomConnectButton } from '~~/components/scaffold-eth'
import MyBlogs from './MyBlogs'

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
      <Link href="/">
        <Image src="/logo.svg" className="rounded-md border" alt="logo" width={48} height={48} />
      </Link>
      <div className="flex-1" />
      {isConnected ? (
        <>
          <MyBlogs />
          <WriteButton />
          <RainbowKitCustomConnectButton />
        </>
      ) : null}
    </div>
  )
}

Header.HEIGHT = HEADER_HEIGHT
