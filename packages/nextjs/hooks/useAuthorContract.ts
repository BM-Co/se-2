import { useScaffoldContractRead } from './scaffold-eth'

export default function useAuthorContractQuery(address: string) {
  return useScaffoldContractRead({
    contractName: 'AuthorsList',
    functionName: 'getPublicationDetails',
    args: [address],
    enabled: !!address,
  })
}
