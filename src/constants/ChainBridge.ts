import { ChainBridgeConfig } from './ChainBridge.d';
const ChainBridge: ChainBridgeConfig = {
  chains: [
    {
      chainId: 0,
      networkId: 2154,
      name: 'Forge',
      decimals: 18,
      rpcUrl: 'https://prod-forge.prod.findora.org:8545/',
      explorerUrl: 'https://testnet-forge.evm.findorascan.io/',
      type: 'Ethereum',
      nativeTokenSymbol: 'FRA',
      servers: [
        {
          bridgeAddress: '0xD520c4eaEe94AEa1C74b2bdfD0A60F7F1662EFEc',
          erc20HandlerAddress: '0x656DF8FA08e32563184C8f1f0a3fF5808C4F1BBb',
          chainId: 1,
        },
      ],
      tokens: [
        {
          address: '0x5b15Cdff7Fe65161C377eDeDc34A4E4E31ffb00B',
          name: 'zkUSDT FRC20',
          symbol: 'zkUSDT',
          imageUri: 'USDTIcon',
          chainId: [1],
          resourceId: '0x000000000000000000000000000000a16ebe4a02bbccc786776a9388ff000000',
        },
      ],
    },
    {
      chainId: 1,
      networkId: 84531,
      name: 'Goerli',
      decimals: 18,
      rpcUrl: 'https://goerli.base.org/',
      explorerUrl: 'https://goerli.basescan.org/',
      type: 'Ethereum',
      nativeTokenSymbol: 'ETH',
      servers: [
        {
          bridgeAddress: '0xD520c4eaEe94AEa1C74b2bdfD0A60F7F1662EFEc',
          erc20HandlerAddress: '0x656DF8FA08e32563184C8f1f0a3fF5808C4F1BBb',
          chainId: 0,
        },
      ],
      tokens: [
        {
          address: '0x74e918F18b1260728d92A2606a46521D7Db490d0',
          name: 'zkUSDT ERC20',
          symbol: 'zkUSDT.f',
          imageUri: 'USDTIcon',
          resourceId: '0x000000000000000000000000000000a16ebe4a02bbccc786776a9388ff000000',
          chainId: [0],
        },
      ],
    },
  ],
};
export default ChainBridge;
