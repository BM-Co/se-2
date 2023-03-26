import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import AuthorBlogs from '~~/components/AuthorBlogs'
import AuthorContractDetail from '~~/components/AuthorContractDetail'
import WriteButton from '~~/components/WriteButton'
import useAuthorContractQuery from '~~/hooks/useAuthorContract'

export default function AllBlogs() {
  const { address } = useAccount()
  const authorContractQuery = useAuthorContractQuery(address)

  const content = useMemo(() => {
    if (authorContractQuery.data) {
      if (parseInt(authorContractQuery.data, 16) === 0) {
        return (
          <div className="flex flex-col items-center justify-center space-y-4 rounded-md border p-4">
            <div>You have not registered as an author</div>
            <WriteButton />
          </div>
        )
      }

      return (
        <div className="space-y-4">
          <AuthorContractDetail contractAddress={authorContractQuery.data} className="flex-1" size="large" />
          <div className="border-b" />
          <AuthorBlogs contractAddress={authorContractQuery.data} authorAddress={address} />
        </div>
      )
    }
  }, [authorContractQuery, address])

  return (
    <div className="p-4">
      <div className="mx-auto max-w-screen-md">{content}</div>
    </div>
  )
}
