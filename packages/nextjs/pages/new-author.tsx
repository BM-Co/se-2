import clsx from 'clsx'
import { BigNumber } from 'ethers'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useMemo } from 'react'
import { HiOutlinePlus } from 'react-icons/hi2'
import { useAccount } from 'wagmi'
import * as yup from 'yup'
import ErrorMessage from '~~/components/ErrorMessage'
import { useScaffoldContractRead, useScaffoldContractWrite } from '~~/hooks/scaffold-eth'

const validationSchema = yup.object({
  name: yup.string().required('Author Name is required'),
  publicationName: yup.string().required('Publication Name is required'),
  subscriptionPrice: yup.number().min(0).required('Please enter a valid subscription price'),
})

export default function NewAuthor() {
  const { address } = useAccount()

  const { data, isLoading, isError } = useScaffoldContractRead({
    contractName: 'AuthorsList',
    functionName: 'getPublicationDetails',
    args: [address],
  })

  const formik = useFormik({
    validationSchema,
    initialValues: {
      name: '',
      publicationName: '',
      subscriptionPrice: 0,
    },
    onSubmit: () => {
      writeAsync()
    },
  })

  const subscriptionPrice = useMemo(() => {
    try {
      return BigNumber.from(formik.values.subscriptionPrice)
    } catch (error) {
      return BigNumber.from(0)
    }
  }, [formik])

  const { writeAsync, isLoading: isCreatingAuthor } = useScaffoldContractWrite({
    contractName: 'AuthorsList',
    functionName: 'addAuthor',
    args: [formik.values.name, formik.values.publicationName, subscriptionPrice],
  })

  const content = useMemo(() => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <div className="skeleton h-4 w-7/12 rounded-md" />
          <div className="skeleton h-8 w-full rounded-md" />
          <div className="skeleton h-4 w-7/12 rounded-md" />
          <div className="skeleton h-8 w-full rounded-md" />
          <div className="skeleton h-4 w-7/12 rounded-md" />
          <div className="skeleton h-8 w-full rounded-md" />
          <div className="flex items-center justify-end space-x-4">
            <div className="skeleton h-8 w-20 rounded-md" />
            <div className="skeleton h-8 w-20 rounded-md" />
          </div>
        </div>
      )
    }

    if (isError) {
      return <ErrorMessage />
    }

    if (data) {
      if (parseInt(data, 16) === 0) {
        return (
          <div>
            <div className="mb-4 text-3xl font-medium">Become a author</div>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="form-label" htmlFor="name">
                  Author Name
                </label>
                <input
                  className="input max-w-none"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange('name')}
                />
                {formik.errors.name ? <label className="form-label text-error">{formik.errors.name}</label> : null}
              </div>
              <div className="space-y-1">
                <label className="form-label" htmlFor="publicationName">
                  Publication Name
                </label>
                <input
                  className="input max-w-none"
                  id="publicationName"
                  value={formik.values.publicationName}
                  onChange={formik.handleChange('publicationName')}
                />
                {formik.errors.publicationName ? (
                  <label className="form-label text-error">{formik.errors.publicationName}</label>
                ) : null}
              </div>
              <div className="space-y-1">
                <label className="form-label" htmlFor="subscriptionPrice">
                  Subscription Price
                </label>
                <input
                  className="input max-w-none"
                  type="number"
                  id="subscriptionPrice"
                  value={formik.values.subscriptionPrice}
                  onChange={formik.handleChange('subscriptionPrice')}
                />
                {formik.errors.subscriptionPrice ? (
                  <label className="form-label text-error">{formik.errors.subscriptionPrice}</label>
                ) : null}
              </div>
              <div className="flex items-center justify-end space-x-4">
                <button className="btn" type="reset">
                  Cancel
                </button>
                <button className={clsx('btn-primary btn', isCreatingAuthor ? 'btn-loading' : undefined)} type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )
      }

      return (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-md border p-4">
          <div>You have already registered as an author</div>
          <Link href="/write" className="btn-outline-primary btn space-x-2">
            <HiOutlinePlus className="h-5 w-5" />
            <span>Write A Blog</span>
          </Link>
        </div>
      )
    }
  }, [isLoading, isError, data, formik, isCreatingAuthor])

  return (
    <div className="p-4">
      <div className="mx-auto max-w-screen-md">{content}</div>
    </div>
  )
}
