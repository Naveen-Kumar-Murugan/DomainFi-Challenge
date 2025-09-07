// wagmi.ts
import { createConfig, http } from 'wagmi'
import { hardhat } from './chains'

export const config = createConfig({
  chains: [hardhat],
  transports: {
    [hardhat.id]: http('http://127.0.0.1:8545'), // Hardhat RPC
  },
})
