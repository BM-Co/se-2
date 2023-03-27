import clsx from 'clsx'
import Link from 'next/link'
import { useMemo } from 'react'
import { Address, useAccount } from 'wagmi'
import { useScaffoldContractRead } from '~~/hooks/scaffold-eth'
import { useAuthorPublicationSubscriptionPrice } from '~~/hooks/useAuthor'
import useSubscriptionStatus from '~~/hooks/useSubscriptionStatus'
import AuthorContractDetail from './AuthorContractDetail'
import SubscribeButton from './SubscribeButton'
import WriteButton from './WriteButton'

type AuthorDetailProps = {
  authorAddress: Address
  className?: string
  style?: React.CSSProperties
}

export default function AuthorDetail({ authorAddress, className, style }: AuthorDetailProps) {
  const { address } = useAccount()

  const authorContractResult = useScaffoldContractRead({
    contractName: 'AuthorsList',
    functionName: 'getPublicationDetails',
    args: [authorAddress],
  })
  const authorContractAddress = authorContractResult.data

  const isLoading = authorContractResult.isLoading

  const subscriptionStatusQuery = useSubscriptionStatus(authorContractAddress)
  const authorPublicationSubscriptionPriceResult = useAuthorPublicationSubscriptionPrice(authorContractAddress)

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          <div className="skeleton h-10 w-7/12 rounded-md" />
          <div className="skeleton h-6 rounded-md" />
        </div>
      )
    }

    if (authorContractAddress) {
      return (
        <div className="flex items-center space-x-2">
          {subscriptionStatusQuery.data || address === authorAddress ? (
            <Link className="flex-1" href={`/author/${authorContractAddress}`}>
              <AuthorContractDetail contractAddress={authorContractAddress} />
            </Link>
          ) : (
            <AuthorContractDetail className="flex-1" contractAddress={authorContractAddress} />
          )}
          {address !== authorAddress && authorPublicationSubscriptionPriceResult.data ? (
            <SubscribeButton
              contractAddress={authorContractAddress}
              price={authorPublicationSubscriptionPriceResult.data}
            />
          ) : (
            <WriteButton />
          )}
        </div>
      )
    }

    return null
  }, [
    isLoading,
    authorContractAddress,
    subscriptionStatusQuery,
    authorAddress,
    address,
    authorPublicationSubscriptionPriceResult,
  ])

  return (
    <div className={clsx(className)} style={style}>
      {content}
    </div>
  )
}
