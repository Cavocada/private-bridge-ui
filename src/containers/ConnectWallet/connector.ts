import { InjectedConnector } from '@web3-react/injected-connector';

import ChainBridge from '_constants/ChainBridge';
import { ChainBridgeConfig } from '_constants/ChainBridge.d';

const _chainBridge: ChainBridgeConfig = { chains: ChainBridge.chains.filter((item) => item.type === 'Ethereum') };
const _chainIdList: number[] = _chainBridge.chains.map((item) => item.networkId);

export const injected = new InjectedConnector({ supportedChainIds: _chainIdList });
