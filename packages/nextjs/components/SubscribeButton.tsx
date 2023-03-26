import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useScaffoldContractWrite } from '~~/hooks/scaffold-eth'
import useSubscriptionStatus from '~~/hooks/useSubscriptionStatus'

type SubscribeButtonProps = {
  contractAddress: string
  className?: string
  style?: React.CSSProperties
}

export default function SubscribeButton({ contractAddress, className, style }: SubscribeButtonProps) {
  const router = useRouter()

  const subscriptionStatusQuery = useSubscriptionStatus(contractAddress)

  const subscribeMutation = useScaffoldContractWrite({
    contractName: 'Author',
    functionName: 'extendAndCreateSubscription',
    // @ts-expect-error
    address: contractAddress,
    onSuccess: () => {
      router.push(`/author/${contractAddress}`)
    },
  })

  const buttonLabel = useMemo(() => {
    if (subscriptionStatusQuery.isLoading) {
      return 'Checking'
    }

    if (typeof subscriptionStatusQuery.data !== 'undefined') {
      if (subscriptionStatusQuery.data) {
        return 'Subscribed'
      }
      return 'Subscribe'
    }

    return null
  }, [subscriptionStatusQuery])

  return (
    <button
      className={clsx(
        'btn',
        subscriptionStatusQuery.isLoading || subscribeMutation.isLoading ? 'btn-loading' : undefined,
        className,
      )}
      disabled={!(typeof subscriptionStatusQuery.data !== 'undefined' && !subscriptionStatusQuery.data)}
      style={style}
      onClick={() => {
        subscribeMutation.writeAsync()
      }}
    >
      {buttonLabel}
    </button>
  )
}
