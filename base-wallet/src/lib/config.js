export const DEFAULT_RPC_URLS = [
  'https://mainnet.base.org',
  'https://base.blockpi.network/v1/rpc/public',
  'https://base.publicnode.com',
  'https://1rpc.io/base'
];

export const BASE_CHAIN = {
  id: 8453,
  name: 'Base',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: { http: DEFAULT_RPC_URLS },
    public: { http: DEFAULT_RPC_URLS }
  },
  blockExplorers: {
    default: {
      name: 'BaseScan',
      url: 'https://basescan.org'
    }
  }
};
