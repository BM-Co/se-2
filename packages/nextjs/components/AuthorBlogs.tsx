import clsx from 'clsx'
import { range } from 'lodash'
import { useMemo } from 'react'
import { HiOutlineDocumentText } from 'react-icons/hi2'
import { useAccount } from 'wagmi'
import { useScaffoldContractRead } from '~~/hooks/scaffold-eth'
import BlogDetail from './BlogDetail'
import ErrorMessage from './ErrorMessage'
import WriteButton from './WriteButton'

type AuthorBlogsProps = {
  authorAddress?: string
  contractAddress: string
  className?: string
  style?: React.CSSProperties
}

export default function AuthorBlogs({ authorAddress, contractAddress, className, style }: AuthorBlogsProps) {
  const { address } = useAccount()

  const postsQuery = useScaffoldContractRead({
    contractName: 'Author',
    functionName: 'getAllPosts',
    // @ts-expect-error
    address: contractAddress,
  })

  const content = useMemo(() => {
    if (postsQuery.isLoading) {
      return (
        <>
          {range(5).map((item) => {
            return (
              <div key={item} className="space-y-2 p-4">
                <div className="skeleton h-10 rounded-md" />
                <div className="skeleton h-2 w-7/12 rounded" />
              </div>
            )
          })}
        </>
      )
    }

    if (postsQuery.isError) {
      return <ErrorMessage />
    }

    if (postsQuery.data) {
      if (postsQuery.data.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center rounded border p-8">
            <HiOutlineDocumentText className="mb-6 h-12 w-12" />
            <div>No blogs created yet</div>
            {authorAddress === address ? <WriteButton className="mt-2" /> : null}
          </div>
        )
      }

      return (
        <>
          {postsQuery.data.map((blogHash) => (
            <BlogDetail key={blogHash} blogHash={blogHash} className="p-4" />
          ))}
        </>
      )
    }

    return null
  }, [postsQuery, authorAddress, address])

  return (
    <div className={clsx('divide-y rounded-md border', className)} style={style}>
      {content}
    </div>
  )
}
