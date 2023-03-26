import { useAccount } from 'wagmi'
import { useScaffoldContractRead } from './scaffold-eth'

export default function useSubscriptionStatus(contractAddress?: string) {
  const { address } = useAccount()

  return useScaffoldContractRead({
    contractName: 'Author',
    functionName: 'checkSubscriber',
    args: [address],
    // @ts-expect-error
    address: contractAddress,
    enabled: !!contractAddress,
  })
}
