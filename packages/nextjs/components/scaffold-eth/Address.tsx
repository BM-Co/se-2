import { CheckCircleIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { ethers } from 'ethers'
import { isAddress } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import Blockies from 'react-blockies'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useEnsAvatar, useEnsName } from 'wagmi'

const blockExplorerLink = (address: string, blockExplorer?: string) =>
  `${blockExplorer || 'https://etherscan.io/'}address/${address}`

type TAddressProps = {
  address?: string
  blockExplorer?: string
  disableAddressLink?: boolean
  format?: 'short' | 'long'
}

/**
 * Displays an address (or ENS) with a Blockie image and option to copy address.
 */
export const Address = ({ address, blockExplorer, disableAddressLink, format }: TAddressProps) => {
  const [ens, setEns] = useState<string | null>()
  const [ensAvatar, setEnsAvatar] = useState<string | null>()
  const [addressCopied, setAddressCopied] = useState(false)

  const { data: fetchedEns } = useEnsName({ address, enabled: isAddress(address ?? ''), chainId: 1 })
  const { data: fetchedEnsAvatar } = useEnsAvatar({
    address,
    enabled: isAddress(address ?? ''),
    chainId: 1,
    cacheTime: 30_000,
  })

  // We need to apply this pattern to avoid Hydration errors.
  useEffect(() => {
    setEns(fetchedEns)
  }, [fetchedEns])

  useEffect(() => {
    setEnsAvatar(fetchedEnsAvatar)
  }, [fetchedEnsAvatar])

  // Skeleton UI
  if (!address) {
    return (
      <div className="flex animate-pulse space-x-4">
        <div className="h-6 w-6 rounded-md bg-slate-300"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 rounded bg-slate-300"></div>
        </div>
      </div>
    )
  }

  if (!ethers.utils.isAddress(address)) {
    return <span className="text-error">Wrong address</span>
  }

  const explorerLink = blockExplorerLink(address, blockExplorer)
  let displayAddress = address?.slice(0, 5) + '...' + address?.slice(-4)

  if (ens) {
    displayAddress = ens
  } else if (format === 'long') {
    displayAddress = address
  }

  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        {ensAvatar ? (
          // Don't want to use nextJS Image here (and adding remote patterns for the URL)
          // eslint-disable-next-line
          <img className="rounded-full" src={ensAvatar} width={24} height={24} alt={`${address} avatar`} />
        ) : (
          <Blockies className="mx-auto rounded-full" size={8} seed={address.toLowerCase()} scale={3} />
        )}
      </div>
      {disableAddressLink ? (
        <span className="ml-1.5 text-lg font-normal">{displayAddress}</span>
      ) : (
        <a className="ml-1.5 text-lg font-normal" target="_blank" href={explorerLink} rel="noopener noreferrer">
          {displayAddress}
        </a>
      )}
      {addressCopied ? (
        <CheckCircleIcon
          className="ml-1.5 h-5 w-5 cursor-pointer text-xl font-normal text-sky-600"
          aria-hidden="true"
        />
      ) : (
        <CopyToClipboard
          text={address}
          onCopy={() => {
            setAddressCopied(true)
            setTimeout(() => {
              setAddressCopied(false)
            }, 800)
          }}
        >
          <DocumentDuplicateIcon
            className="ml-1.5 h-5 w-5 cursor-pointer text-xl font-normal text-sky-600"
            aria-hidden="true"
          />
        </CopyToClipboard>
      )}
    </div>
  )
}
