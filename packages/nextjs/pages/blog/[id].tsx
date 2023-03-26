import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { HiOutlineCalendar } from 'react-icons/hi2'
import ReactMarkdown from 'react-markdown'
import ErrorMessage from '~~/components/ErrorMessage'
import useBlogQuery from '~~/hooks/useBlogQuery'

export default function Blog() {
  const router = useRouter()
  const blogHash = router.query.id as string

  const blogQuery = useBlogQuery(blogHash)

  const content = useMemo(() => {
    if (blogQuery.isLoading) {
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

    if (blogQuery.isError) {
      return <ErrorMessage />
    }

    if (blogQuery.data) {
      return (
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="text-3xl font-medium">{blogQuery.data.title}</div>
            {blogQuery.data.timestamp ? (
              <div className="flex items-center space-x-2 text-sm text-content2">
                <HiOutlineCalendar className="h-5 w-5" />
                <div>Published on - {dayjs(blogQuery.data.timestamp).format('DD MMM YYYY')}</div>
              </div>
            ) : null}
          </div>
          <div className="border-b" />
          <div className="prose">
            <ReactMarkdown>{blogQuery.data.content}</ReactMarkdown>
          </div>
        </div>
      )
    }

    return null
  }, [blogQuery])

  return (
    <div className="p-4">
      <div className="mx-auto max-w-screen-md">{content}</div>
    </div>
  )
}
