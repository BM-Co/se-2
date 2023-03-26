import { range } from 'lodash'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { HiOutlineDocumentText } from 'react-icons/hi2'
import AuthorContractDetail from '~~/components/AuthorContractDetail'
import BlogDetail from '~~/components/BlogDetail'
import ErrorMessage from '~~/components/ErrorMessage'
import { useScaffoldContractRead } from '~~/hooks/scaffold-eth'

export default function AuthorPage() {
  const router = useRouter()

  const authorContractAddress = router.query.id as string

  const postsQuery = useScaffoldContractRead({
    contractName: 'Author',
    functionName: 'getAllPosts',
    // @ts-expect-error
    address: authorContractAddress,
  })

  const content = useMemo(() => {
    if (postsQuery.isLoading) {
      return (
        <div className="space-y-4">
          {range(5).map((item) => {
            return (
              <div key={item} className="space-y-2">
                <div className="skeleton h-10 rounded-md" />
                <div className="skeleton h-2 w-7/12 rounded" />
              </div>
            )
          })}
        </div>
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
            <div className="mb-2">No blogs created yet</div>
          </div>
        )
      }

      return (
        <div className="space-y-4">
          {postsQuery.data.map((blogHash) => (
            <BlogDetail key={blogHash} blogHash={blogHash} />
          ))}
        </div>
      )
    }

    return null
  }, [postsQuery])

  return (
    <div className="p-4">
      <div className="mx-auto max-w-screen-md">
        <AuthorContractDetail contractAddress={authorContractAddress} className="mb-4" />
        {content}
      </div>
    </div>
  )
}
