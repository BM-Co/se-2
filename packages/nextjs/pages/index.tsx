import { range } from 'lodash'
import Link from 'next/link'
import { useMemo } from 'react'
import { HiOutlineDocumentText, HiOutlineUserPlus } from 'react-icons/hi2'
import AuthorDetail from '~~/components/AuthorDetail'
import ErrorMessage from '~~/components/ErrorMessage'
import { useScaffoldContractRead } from '~~/hooks/scaffold-eth'

export default function Home() {
  const { data, isLoading, isError } = useScaffoldContractRead({
    contractName: 'AuthorsList',
    functionName: 'getAllAuthors',
  })

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {range(10).map((item) => (
            <div className="skeleton h-6 rounded-md" key={item} />
          ))}
        </div>
      )
    }

    if (isError) {
      return <ErrorMessage />
    }

    if (data) {
      if (data.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center space-y-4 rounded border p-4">
            <HiOutlineDocumentText className="h-12 w-12" />
            <div>No Authors Created Yet</div>
          </div>
        )
      }

      return (
        <div className="space-y-4">
          {data.map((item) => (
            <AuthorDetail key={item} authorAddress={item} />
          ))}
        </div>
      )
    }

    return null
  }, [isLoading, isError, data])

  return (
    <div className="p-4">
      <div className="mx-auto max-w-screen-lg space-y-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 text-3xl font-medium">All Authors</div>
          <Link href="/new-author" className="btn-outline-primary btn space-x-2">
            <HiOutlineUserPlus className="h-5 w-5" />
            <span>Become a Author</span>
          </Link>
        </div>
        {content}
      </div>
    </div>
  )
}
