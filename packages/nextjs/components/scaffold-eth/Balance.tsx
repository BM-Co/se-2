import { useAccountBalance } from '~~/hooks/scaffold-eth'

type TBalanceProps = {
  address?: string
  className?: string
}

/**
 * Display (ETH & USD) balance of an ETH address.
 */
export const Balance = ({ address, className = '' }: TBalanceProps) => {
  const { balance, price, isError, isLoading, onToggleBalance, isEthBalance } = useAccountBalance(address)

  if (!address || isLoading || balance === null) {
    return (
      <div className="flex animate-pulse space-x-4">
        <div className="h-6 w-6 rounded-md bg-slate-300" />
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 rounded bg-slate-300" />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className={'flex max-w-fit cursor-pointer flex-col items-center rounded-md border-2 border-gray-400 px-2'}>
        <div className="text-xs text-warning">Error</div>
      </div>
    )
  }

  return (
    <button
      className={`btn-sm btn-ghost btn flex flex-col items-center font-normal hover:bg-transparent ${className}`}
      onClick={onToggleBalance}
    >
      <div className="flex w-full items-center justify-center">
        {isEthBalance ? (
          <>
            <span>{balance?.toFixed(4)}</span>
            <span className="ml-1 text-xs font-bold">MATIC</span>
          </>
        ) : (
          <>
            <span className="mr-1 text-xs font-bold">$</span>
            <span>{(balance * price).toFixed(2)}</span>
          </>
        )}
      </div>
    </button>
  )
}
