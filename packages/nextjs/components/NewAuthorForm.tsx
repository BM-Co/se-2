import clsx from 'clsx'
import { BigNumber } from 'ethers'
import { useFormik } from 'formik'
import { useMemo } from 'react'
import * as yup from 'yup'
import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth'

const validationSchema = yup.object({
  name: yup.string().required('Author Name is required'),
  publicationName: yup.string().required('Publication Name is required'),
  subscriptionPrice: yup.number().min(0).required('Please enter a valid subscription price'),
})

type NewAuthorFormProps = {
  className?: string
  style?: React.CSSProperties
}

export default function NewAuthorForm({ className, style }: NewAuthorFormProps) {
  const formik = useFormik({
    validationSchema,
    initialValues: {
      name: '',
      publicationName: '',
      subscriptionPrice: 0,
    },
    validateOnBlur: true,
    onSubmit: () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
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

  return (
    <form onSubmit={formik.handleSubmit} className={clsx('space-y-4', className)} style={style}>
      <div className="space-y-1">
        <label className="form-label" htmlFor="name">
          Author Name
        </label>
        <input
          className="input max-w-none"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
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
          onBlur={formik.handleBlur('publicationName')}
        />
        {formik.errors.publicationName ? (
          <label className="form-label text-error">{formik.errors.publicationName}</label>
        ) : null}
      </div>
      <div className="space-y-1">
        <label className="form-label" htmlFor="subscriptionPrice">
          <span>
            Subscription Price (in <span className="font-medium text-primary">Ether</span>)
          </span>
        </label>
        <input
          className="input max-w-none"
          type="number"
          id="subscriptionPrice"
          value={formik.values.subscriptionPrice}
          onChange={formik.handleChange('subscriptionPrice')}
          onBlur={formik.handleBlur('subscriptionPrice')}
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
  )
}
