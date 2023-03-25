import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import { configureChains } from 'wagmi'
import * as chains from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import scaffoldConfig from '~~/scaffold.config'
import { getTargetNetwork } from '~~/utils/scaffold-eth'

const configuredNetwork = getTargetNetwork()

// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
const enabledChains = (configuredNetwork.id as number) === 1 ? [configuredNetwork] : [configuredNetwork, chains.mainnet]

/**
 * Chains for the app
 */
export const appChains = configureChains(
  enabledChains,
  [
    alchemyProvider({
      apiKey: scaffoldConfig.alchemyApiKey,
      priority: 0,
    }),
    publicProvider({ priority: 1 }),
  ],
  {
    stallTimeout: 3_000,
    // Sets pollingInterval if using chain's other than local hardhat chain
    ...(configuredNetwork.id !== chains.hardhat.id
      ? {
          pollingInterval: scaffoldConfig.pollingInterval,
        }
      : {}),
  },
)

/**
 * list of burner wallet compatable chains
 */
export const burnerChains = configureChains(
  [chains.hardhat],
  [
    alchemyProvider({
      apiKey: scaffoldConfig.alchemyApiKey,
    }),
    publicProvider(),
  ],
)

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors = connectorsForWallets([
  {
    groupName: 'Supported Wallets',
    wallets: [metaMaskWallet({ chains: appChains.chains, shimDisconnect: true })],
  },
])
