import { BanknotesIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { ethers } from 'ethers'
import { useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { hardhat, localhost } from 'wagmi/chains'
import { useTransactor } from '~~/hooks/scaffold-eth'
import { getLocalProvider } from '~~/utils/scaffold-eth'

// Number of ETH faucet sends to an address
const NUM_OF_ETH = '1'

/**
 * FaucetButton button which lets you grab eth.
 */
export const FaucetButton = () => {
  const { address } = useAccount()
  const { chain: ConnectedChain } = useNetwork()
  const [loading, setLoading] = useState(false)
  const provider = getLocalProvider(localhost)
  const signer = provider?.getSigner()
  const faucetTxn = useTransactor(signer)

  const sendETH = async () => {
    try {
      setLoading(true)
      await faucetTxn({ to: address, value: ethers.utils.parseEther(NUM_OF_ETH) })
      setLoading(false)
    } catch (error) {
      console.error('⚡️ ~ file: FaucetButton.tsx:sendETH ~ error', error)
      setLoading(false)
    }
  }

  // Render only on local chain
  if (!ConnectedChain || ConnectedChain.id !== hardhat.id) {
    return null
  }

  return (
    <button className={clsx('btn-outline-secondary btn-sm btn')} onClick={sendETH} disabled={loading}>
      {!loading && <BanknotesIcon className="h-5 w-5" />}
    </button>
  )
}
