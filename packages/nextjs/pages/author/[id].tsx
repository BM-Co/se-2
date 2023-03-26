import { useRouter } from 'next/router'
import AuthorBlogs from '~~/components/AuthorBlogs'
import AuthorContractDetail from '~~/components/AuthorContractDetail'

export default function AuthorPage() {
  const router = useRouter()

  const authorContractAddress = router.query.id as string

  return (
    <div className="p-4">
      <div className="mx-auto max-w-screen-md space-y-4">
        <AuthorContractDetail contractAddress={authorContractAddress} size="large" />
        <div className="border-b" />
        <AuthorBlogs contractAddress={authorContractAddress} />
      </div>
    </div>
  )
}
