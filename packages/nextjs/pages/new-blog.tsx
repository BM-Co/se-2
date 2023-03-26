import axios from 'axios'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { useAccount, useMutation } from 'wagmi'
import * as yup from 'yup'
import { useScaffoldContractRead, useScaffoldContractWrite } from '~~/hooks/scaffold-eth'

async function createBlog(body: { title: string; content: string }) {
  const { data } = await axios.post<{
    IpfsHash: string
    PinSize: number
    Timestamp: string
  }>('/api/blog', body)
  return data
}

const validationSchema = yup.object({
  title: yup.string().required('Blog title is required'),
  content: yup.string().required('Blog Content is required'),
})

export default function NewBlog() {
  const router = useRouter()

  const createBlogMutation = useMutation(createBlog, {
    onSuccess: (data) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      addPostMutation.writeAsync({
        recklesslySetUnpreparedArgs: [data.IpfsHash],
      })
    },
    onError: () => {
      toast.error('Something went wrong. Please try again')
    },
  })

  const formik = useFormik({
    validationSchema,
    initialValues: {
      title: '',
      content: '',
    },
    validateOnBlur: true,
    onSubmit: (data) => {
      return createBlogMutation.mutate(data)
    },
  })

  const { address: ownerAddress } = useAccount()
  const authorContractResult = useScaffoldContractRead({
    contractName: 'AuthorsList',
    functionName: 'getPublicationDetails',
    args: [ownerAddress],
  })

  const addPostMutation = useScaffoldContractWrite({
    contractName: 'Author',
    functionName: 'publishPost',
    // @ts-expect-error
    address: authorContractResult.data,
    args: [createBlogMutation.data?.IpfsHash],
    onSuccess: () => {
      router.push(`blog/${createBlogMutation.data.IpfsHash}`)
    },
  })

  return (
    <div className="p-4">
      <div className="mx-auto max-w-screen-md space-y-8">
        <div className="text-3xl font-medium">Write Blog</div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="space-y-1">
            <label className="form-label" htmlFor="blogTitle">
              Title
            </label>
            <input
              className="input max-w-none"
              id="blogTitle"
              value={formik.values.title}
              onChange={formik.handleChange('title')}
              onBlur={formik.handleBlur('title')}
            />
            {formik.errors.title ? <label className="form-label text-error">{formik.errors.title}</label> : null}
          </div>
          <div className="space-y-1">
            <label className="form-label" htmlFor="blogContent">
              <span>
                Content <span className="italic">(can content Markdown)</span>
              </span>
            </label>
            <textarea
              id="blogContent"
              className="textarea max-w-none"
              rows={20}
              value={formik.values.content}
              onChange={formik.handleChange('content')}
              onBlur={formik.handleBlur('content')}
            />
            {formik.errors.content ? <label className="form-label text-error">{formik.errors.content}</label> : null}
          </div>
          <div className="flex items-center justify-end space-x-4">
            <button className="btn" type="reset">
              Cancel
            </button>
            <button
              className={clsx(
                'btn-primary btn',
                createBlogMutation.isLoading || addPostMutation.isLoading ? 'btn-loading' : undefined,
              )}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
