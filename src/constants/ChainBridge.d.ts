export type TokenConfig = {
  address: string;
  name?: string;
  symbol?: string;
  imageUri?: string;
  resourceId: string;
  chainId: number[];
  isNativeWrappedToken?: boolean;
};
export type ServerConfig = {
  bridgeAddress: string;
  erc20HandlerAddress: string;
  chainId: number;
};

export type ChainType = 'Ethereum' | 'Substrate';

export type BridgeConfig = {
  networkId?: number;
  chainId: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  type: ChainType;
  tokens: TokenConfig[];
  servers: ServerConfig[];
  nativeTokenSymbol: string;
  decimals: number;
};

export type EvmBridgeConfig = BridgeConfig & {
  type: 'Ethereum';
  blockExplorer?: string; //This should be the full path to display a tx hash, without the trailing slash, ie. https://etherscan.io/tx
  defaultGasPrice?: number;
  deployedBlockNumber?: number;
};

export type SubstrateBridgeConfig = BridgeConfig & {
  type: 'Substrate';
  chainbridgePalletName: string;
  bridgeFeeFunctionName?: string; // If this value is provided, the chain value will be used will be used
  bridgeFeeValue?: number; // If the above value is not provided, this value will be used for the fee. No scaling should be applied.
  transferPalletName: string;
  transferFunctionName: string;
  typesFileName: string;
};

export type BridgeConfigSimple = EvmBridgeConfig | SubstrateBridgeConfig;

export type ChainBridgeConfig = {
  chains: Array<BridgeConfigSimple>;
};

export type AddEthereumChainParameter = {
  chainId: string;
  blockExplorerUrls?: string[];
  chainName?: string;
  iconUrls?: string[];
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls?: string[];
};
