// chains.ts
import { defineChain } from 'viem'

export const hardhat = defineChain({
  id: 31337, // Hardhat default chain ID
  name: 'Hardhat',
  network: 'hardhat',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] }, // Hardhat node
    public: { http: ['http://127.0.0.1:8545'] },
  },
})
