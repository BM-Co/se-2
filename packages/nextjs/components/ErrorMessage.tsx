import clsx from 'clsx'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'

type ErrorMessageProps = {
  className?: string
  style?: React.CSSProperties
}

export default function ErrorMessage({ className, style }: ErrorMessageProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center space-y-2 rounded-md border border-error/20 bg-error/5 p-4 text-error',
        className,
      )}
      style={style}
    >
      <HiOutlineExclamationTriangle className="h-8 w-8" />
      <div>Something went wrong</div>
    </div>
  )
}
