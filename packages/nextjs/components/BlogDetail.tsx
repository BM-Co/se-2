import clsx from 'clsx'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useMemo } from 'react'
import useBlogQuery from '~~/hooks/useBlogQuery'

type BlogDetailProps = {
  blogHash: string
  className?: string
  style?: React.CSSProperties
}

export default function BlogDetail({ blogHash, className, style }: BlogDetailProps) {
  const blogQuery = useBlogQuery(blogHash)

  const content = useMemo(() => {
    if (blogQuery.isLoading) {
      return (
        <div className="space-y-2">
          <div className="skeleton h-10 rounded-md" />
          <div className="skeleton h-2 w-7/12 rounded" />
        </div>
      )
    }

    if (blogQuery.data) {
      return (
        <Link href={`/blog/${blogHash}`} className="space-y-2">
          <div className="text-xl font-medium">{blogQuery.data.title}</div>
          {blogQuery.data.timestamp ? (
            <div className="text-sm">Published On - {dayjs(blogQuery.data.timestamp).format('DD MMM YYYY')}</div>
          ) : null}
        </Link>
      )
    }

    return null
  }, [blogQuery, blogHash])

  return (
    <div className={clsx(className)} style={style}>
      {content}
    </div>
  )
}
