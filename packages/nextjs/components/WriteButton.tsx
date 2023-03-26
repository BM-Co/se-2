import Link from 'next/link'
import { useMemo } from 'react'
import { HiOutlinePlus, HiOutlineUserPlus } from 'react-icons/hi2'
import { useAccount } from 'wagmi'
import { getParsedEthersError } from './scaffold-eth'
import { useScaffoldContractRead } from '~~/hooks/scaffold-eth'

type WriteButtonProps = {
  className?: string
  style?: React.CSSProperties
}

export default function WriteButton({ className, style }: WriteButtonProps) {
  const { address } = useAccount()

  const { data, isLoading, isError, error } = useScaffoldContractRead({
    contractName: 'AuthorsList',
    functionName: 'getPublicationDetails',
    args: [address],
    enabled: !!address,
  })

  const content = useMemo(() => {
    if (isLoading) {
      return <div className="skeleton h-10 w-40 rounded-md" />
    }

    if (isError) {
      return <div className="text-xs text-error">{getParsedEthersError(error)}</div>
    }

    if (data) {
      if (parseInt(data, 16) === 0) {
        return (
          <Link href="/new-author" className="btn-outline-primary btn space-x-2">
            <HiOutlineUserPlus className="h-5 w-5" />
            <span>Become a Author</span>
          </Link>
        )
      }

      return (
        <Link href="/new-blog" className="btn-outline-primary btn space-x-2">
          <HiOutlinePlus className="h-5 w-5" />
          <span>Write Blog</span>
        </Link>
      )
    }

    return null
  }, [isLoading, isError, error, data])

  return (
    <div className={className} style={style}>
      {content}
    </div>
  )
}
