import { XMarkIcon } from '@heroicons/react/20/solid'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid'
import React from 'react'
import { toast } from 'react-hot-toast'
import { Spinner } from '~~/components/Spinner'

type TPositions = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

type TNotificationProps = {
  content: React.ReactNode
  status: 'success' | 'info' | 'loading' | 'error' | 'warning'
  duration?: number
  icon?: string
  position?: TPositions
}

type NotificationOptions = {
  duration?: number
  icon?: string
  position?: TPositions
}

const ENUM_STATUSES = {
  success: <CheckCircleIcon className="w-7 text-success" />,
  loading: <Spinner />,
  error: <ExclamationCircleIcon className="w-7 text-error" />,
  info: <InformationCircleIcon className="text-info w-7" />,
  warning: <ExclamationTriangleIcon className="w-7 text-warning" />,
}

const DEFAULT_DURATION = 3000
const DEFAULT_POSITION: TPositions = 'top-center'

/**
 * Custom Notification
 */
const Notification = ({
  content,
  status,
  duration = DEFAULT_DURATION,
  icon,
  position = DEFAULT_POSITION,
}: TNotificationProps) => {
  return toast.custom(
    (t) => (
      <div
        className={`relative flex max-w-sm translate-y-0 transform-gpu flex-row items-center justify-between space-x-2 rounded-md bg-white p-4 text-black shadow-2xl transition-all duration-500 ease-in-out hover:translate-y-1 hover:shadow-none ${
          t.visible ? 'top-0' : '-top-96'
        }`}
      >
        <div className="mb-0 mt-3 self-start text-2xl">{icon ? icon : ENUM_STATUSES[status]}</div>
        <div className="mt-3 break-all">{content}</div>

        <div className="absolute top-1 right-1 cursor-pointer text-lg" onClick={() => toast.dismiss(t.id)}>
          <XMarkIcon className="w-6 cursor-pointer" onClick={() => toast.remove(t.id)} />
        </div>
      </div>
    ),
    {
      duration: status === 'loading' ? Infinity : duration,
      position,
    },
  )
}

export const notification = {
  success: (content: React.ReactNode, options?: NotificationOptions) => {
    return Notification({ content, status: 'success', ...options })
  },
  info: (content: React.ReactNode, options?: NotificationOptions) => {
    return Notification({ content, status: 'info', ...options })
  },
  warning: (content: React.ReactNode, options?: NotificationOptions) => {
    return Notification({ content, status: 'warning', ...options })
  },
  error: (content: React.ReactNode, options?: NotificationOptions) => {
    return Notification({ content, status: 'error', ...options })
  },
  loading: (content: React.ReactNode, options?: NotificationOptions) => {
    return Notification({ content, status: 'loading', ...options })
  },
  remove: (toastId: string) => {
    toast.remove(toastId)
  },
}
