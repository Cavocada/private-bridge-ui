import React, { useEffect, useState, useCallback } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { notification } from 'antd';
import classNames from 'classnames';

import { injected } from './connector';
import { useEagerConnect, useInactiveListener } from '_containers/ConnectWallet/WalletHooks';
import ChainBridge from '_constants/ChainBridge';

import MetamaskSVG from '_assets/images/metamask.svg';
import WalletSVG from '_assets/images/wallet.svg';

import './index.less';
import services from '_src/services';
export interface IConnectWallet {
  typeUI?: 'header' | 'metamask';
  className?: string;
  style?: React.CSSProperties;
}

const ConnectWallet: React.FC<IConnectWallet> = ({ typeUI, className, style, children }) => {
  const triedEager = useEagerConnect();
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = useState<InjectedConnector>();
  console.log('====chainId', chainId);

  async function activatingConnectorFn() {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    } else {
      if (error instanceof UnsupportedChainIdError) {
        const fraNetworkDefault = ChainBridge.chains
          .filter((item) => item.type === 'Ethereum')
          .find((item) => item.networkId === 525);
        try {
          await services.evmServer.switchNetwork(fraNetworkDefault);
        } catch {
          notification.warning({
            message: 'Error Message', // error?.name,
            description: 'Please change your Metamask network to a supported network (i.e. Findora-Forge, Base-Goerli, etc.)',
            top: 80,
          });
        }
      }
    }
  }

  useEffect(() => {
    activatingConnectorFn();
  }, [activatingConnector, connector]);

  const activating = injected === activatingConnector;
  const connected = injected === connector;
  const disabled = !triedEager || !!activatingConnector || !!error;
  const isDisconnect = !error && chainId;

  useInactiveListener(!triedEager || !!activatingConnector);

  function handleOnCLickConnectWallet() {
    if (!isDisconnect) {
      setActivatingConnector(injected);
      activate(injected);
    } else {
      deactivate();
    }
  }

  function ButtonSwitchComponent() {
    if (connected && isDisconnect) {
      if (typeUI === 'header') {
        return (
          <div className="wallet-connected wallet-header">
            <WalletSVG style={{ marginRight: '12px' }} />
            <span className="address">{`${account.slice(0, 5)}···${account.slice(-4)}`}</span>
          </div>
        );
      }
      return <div className="wallet-connected">{children}</div>;
    }

    if (activating) {
      return <div className="connect-no-connected">CONNECTING</div>;
    }
    return (
      <div className="connect-no-connected" onClick={handleOnCLickConnectWallet}>
        {typeUI !== 'header' && <MetamaskSVG style={{ marginRight: '12px' }} />} Connect Wallet
      </div>
    );
  }
  return (
    <div
      style={style}
      className={classNames('components-connect-wallet', className, { 'header-wallet': typeUI === 'header' })}
    >
      {ButtonSwitchComponent()}
    </div>
  );
};

ConnectWallet.defaultProps = {
  typeUI: 'header',
};

export default ConnectWallet;
