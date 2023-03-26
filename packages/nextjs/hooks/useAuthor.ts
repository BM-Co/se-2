import { useScaffoldContractRead } from './scaffold-eth'

export function useAuthorName(contractAddress?: string) {
  return useScaffoldContractRead({
    contractName: 'Author',
    functionName: 'authorName',
    // @ts-expect-error
    address: contractAddress,
    enabled: !!contractAddress,
  })
}

export function useAuthorPublicationName(contractAddress?: string) {
  return useScaffoldContractRead({
    contractName: 'Author',
    functionName: 'publicationName',
    // @ts-expect-error
    address: contractAddress,
    enabled: !!contractAddress,
  })
}

export function useAuthorPublicationSubscriptionPrice(contractAddress?: string) {
  return useScaffoldContractRead({
    contractName: 'Author',
    functionName: 'getPrice',
    // @ts-expect-error
    address: contractAddress,
    enabled: !!contractAddress,
  })
}
