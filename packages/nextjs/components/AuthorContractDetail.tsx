import clsx from 'clsx'
import { ethers } from 'ethers'
import { useMemo } from 'react'
import { FaEthereum } from 'react-icons/fa'
import { useAuthorName, useAuthorPublicationName, useAuthorPublicationSubscriptionPrice } from '~~/hooks/useAuthor'

type AuthorContractDetailProps = {
  contractAddress: string
  className?: string
  style?: React.CSSProperties
}

export default function AuthorContractDetail({ contractAddress, className, style }: AuthorContractDetailProps) {
  const authorNameResult = useAuthorName(contractAddress)
  const authorPublicationsResult = useAuthorPublicationName(contractAddress)
  const authorPublicationSubscriptionPriceResult = useAuthorPublicationSubscriptionPrice(contractAddress)

  const isLoading =
    authorNameResult.isLoading ||
    authorPublicationsResult.isLoading ||
    authorPublicationSubscriptionPriceResult.isLoading

  const authorName = authorNameResult.data
  const publicationName = authorPublicationsResult.data
  const subscriptionPrice = authorPublicationSubscriptionPriceResult.data

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          <div className="skeleton h-10 w-7/12 rounded-md" />
          <div className="skeleton h-6 rounded-md" />
        </div>
      )
    }

    if (authorName && publicationName && subscriptionPrice) {
      return (
        <div className="space-y-1">
          <div className="text-xl font-medium">{publicationName}</div>
          <div className="flex items-center space-x-4 text-sm">
            <span>{authorName}</span>
            <span>|</span>
            <span className="flex items-center space-x-2">
              <FaEthereum />
              <span>{ethers.utils.formatUnits(subscriptionPrice, 'ether')}</span>
            </span>
          </div>
        </div>
      )
    }

    return null
  }, [isLoading, publicationName, authorName, subscriptionPrice])

  return (
    <div className={clsx(className)} style={style}>
      {content}
    </div>
  )
}
