import Link from 'next/link'
import { useMemo } from 'react'
import { HiOutlinePlus } from 'react-icons/hi2'
import { useAccount } from 'wagmi'
import ErrorMessage from '~~/components/ErrorMessage'
import NewAuthorForm from '~~/components/NewAuthorForm'
import { useScaffoldContractRead } from '~~/hooks/scaffold-eth'

export default function NewAuthor() {
  const { address } = useAccount()

  const { data, isLoading, isError } = useScaffoldContractRead({
    contractName: 'AuthorsList',
    functionName: 'getPublicationDetails',
    args: [address],
  })

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <div className="skeleton h-4 w-7/12 rounded-md" />
          <div className="skeleton h-8 w-full rounded-md" />
          <div className="skeleton h-4 w-7/12 rounded-md" />
          <div className="skeleton h-8 w-full rounded-md" />
          <div className="skeleton h-4 w-7/12 rounded-md" />
          <div className="skeleton h-8 w-full rounded-md" />
          <div className="flex items-center justify-end space-x-4">
            <div className="skeleton h-8 w-20 rounded-md" />
            <div className="skeleton h-8 w-20 rounded-md" />
          </div>
        </div>
      )
    }

    if (isError) {
      return <ErrorMessage />
    }

    if (data) {
      if (parseInt(data, 16) === 0) {
        return (
          <div>
            <div className="mb-4 text-3xl font-medium">Become a author</div>
            <NewAuthorForm />
          </div>
        )
      }

      return (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-md border p-4">
          <div>You have already registered as an author</div>
          <Link href="/new-blog" className="btn-outline-primary btn space-x-2">
            <HiOutlinePlus className="h-5 w-5" />
            <span>Write A Blog</span>
          </Link>
        </div>
      )
    }
  }, [isLoading, isError, data])

  return (
    <div className="p-4">
      <div className="mx-auto max-w-screen-md">{content}</div>
    </div>
  )
}
