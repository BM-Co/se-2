import axios from 'axios'
import { useQuery } from 'react-query'

async function fetchBlog(blogHash) {
  const { data } = await axios.get<{ title: string; content: string; timestamp?: string }>(`/${blogHash}`, {
    baseURL: '/api/blog',
    headers: {
      Accept: 'application/json',
    },
  })
  return data
}

export default function useBlogQuery(blogHash: string) {
  return useQuery(['blog', blogHash], () => fetchBlog(blogHash))
}
