import axios from 'axios'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { useQuery } from 'wagmi'
import ErrorMessage from '~~/components/ErrorMessage'

async function fetchBlog(blogHash) {
  const { data } = await axios.get<{ title: string; content: string }>(`/${blogHash}`, {
    baseURL: '/api/blog',
  })
  return data
}

export default function Blog() {
  const router = useRouter()
  const blogHash = router.query.id as string

  const query = useQuery(['blog', blogHash], () => fetchBlog(blogHash))

  const content = useMemo(() => {
    if (query.isLoading) {
      return (
        <div>
          <div className="skeleton mb-4 h-10 w-full rounded-md" />
          <div className="skeleton mb-3 h-4 w-full rounded-md" />
          <div className="skeleton mb-3 h-4 w-full rounded-md" />
          <div className="skeleton mb-8 h-4 w-7/12 rounded-md" />
          <div className="skeleton mb-3 h-4 w-full rounded-md" />
          <div className="skeleton mb-3 h-4 w-full rounded-md" />
          <div className="skeleton mb-8 h-4 w-7/12 rounded-md" />
          <div className="skeleton mb-3 h-4 w-full rounded-md" />
          <div className="skeleton mb-3 h-4 w-9/12 rounded-md" />
        </div>
      )
    }

    if (query.isError) {
      return <ErrorMessage />
    }

    if (query.data) {
      return (
        <div>
          <div className="mb-8 text-3xl font-medium">{query.data.title}</div>
          <div className="prose prose-sm">
            <ReactMarkdown>{query.data.content}</ReactMarkdown>
          </div>
        </div>
      )
    }

    return null
  }, [query])

  return (
    <div className="p-4">
      <div className="mx-auto max-w-screen-md">{content}</div>
    </div>
  )
}
