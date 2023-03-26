import Link from 'next/link'
import { HiOutlineDocumentMagnifyingGlass } from 'react-icons/hi2'
import { useAccount } from 'wagmi'
import useAuthorContractQuery from '~~/hooks/useAuthorContract'

export default function MyBlogs() {
  const { address } = useAccount()
  const authorContractQuery = useAuthorContractQuery(address)

  if (authorContractQuery.data && parseInt(authorContractQuery.data, 16) !== 0) {
    return (
      <Link href="/all-blogs" className="btn space-x-1">
        <HiOutlineDocumentMagnifyingGlass className="h-6 w-6" />
        <span>All Blogs</span>
      </Link>
    )
  }

  return null
}
