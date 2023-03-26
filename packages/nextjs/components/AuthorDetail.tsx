import clsx from 'clsx'
import { useMemo } from 'react'
import { Address } from 'wagmi'
import { useScaffoldContractRead } from '~~/hooks/scaffold-eth'

type AuthorDetailProps = {
  authorAddress: Address
  className?: string
  style?: React.CSSProperties
}

export default function AuthorDetail({ authorAddress, className, style }: AuthorDetailProps) {
  const authorContractResult = useScaffoldContractRead({
    contractName: 'AuthorsList',
    functionName: 'getPublicationDetails',
    args: [authorAddress],
  })
  const authorNameResult = useScaffoldContractRead({
    contractName: 'Author',
    functionName: 'authorName',
    // @ts-expect-error
    address: authorContractResult.data,
    enabled: !!authorContractResult.data,
  })
  const authorPublicationsResult = useScaffoldContractRead({
    contractName: 'Author',
    functionName: 'publicationName',
    // @ts-expect-error
    address: authorContractResult.data,
    enabled: !!authorContractResult.data,
  })

  const isLoading = authorContractResult.isLoading || authorNameResult.isLoading || authorPublicationsResult.isLoading
  const authorName = authorNameResult.data
  const publicationName = authorPublicationsResult.data

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          <div className="skeleton h-10 w-7/12 rounded-md"></div>
          <div className="skeleton h-6 rounded-md"></div>
        </div>
      )
    }

    if (authorName && publicationName) {
      return (
        <div className="flex items-center space-x-2">
          <div className="flex-1 space-y-1">
            <div className="text-xl font-medium">{publicationName}</div>
            <div className="text-sm">{authorName}</div>
          </div>
          <button className="btn">Subscribe</button>
        </div>
      )
    }

    return null
  }, [isLoading, publicationName, authorName])

  return (
    <div className={clsx(className)} style={style}>
      {content}
    </div>
  )
}
