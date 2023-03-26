import { range } from 'lodash'
import { useMemo } from 'react'
import { HiOutlineDocumentText } from 'react-icons/hi2'
import AuthorDetail from '~~/components/AuthorDetail'
import ErrorMessage from '~~/components/ErrorMessage'
import WriteButton from '~~/components/WriteButton'
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
          <div className="flex flex-col items-center justify-center rounded border p-8">
            <HiOutlineDocumentText className="mb-6 h-12 w-12" />
            <div className="mb-2">No authors found yet</div>
            <WriteButton />
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
        </div>
        {content}
      </div>
    </div>
  )
}
