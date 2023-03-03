import React, { useState, useEffect } from 'react';

import FindoraSelect from '_components/FindoraSelect';
import { FindoraListItemType } from '_components/FindoraList';
import NetworkLabel from '_components/NetworkLabel';
import { BridgeConfigSimple, ChainBridgeConfig } from '_constants/ChainBridge.d';
import NetWorkIcon from '_containers/NetWorkIcon';
import FindoraButton from '_components/FindoraButton';

import './index.less';
import services from '_src/services';
import ChainBridge from '_constants/ChainBridge';

export interface ISwitchNetwork {
  onCancel?: () => void;
  destNetworks?: BridgeConfigSimple[];
  sourceNetworks?: BridgeConfigSimple[];
}

const SwitchNetwork: React.FC<ISwitchNetwork> = ({ onCancel, destNetworks, sourceNetworks }) => {
  let newDestworks = destNetworks;
  if (destNetworks.length === 1 && destNetworks[0].nativeTokenSymbol === 'FRA') {
    const _chainBridge: ChainBridgeConfig = { chains: ChainBridge.chains.filter((item) => item.type === 'Ethereum') };

    newDestworks = _chainBridge.chains.filter((item) => {
      if (item.networkId !== sourceNetworks[0]?.networkId) {
        return item;
      }
    });
  }

  const [value, setValue] = useState<BridgeConfigSimple>(newDestworks[0]);
  useEffect(() => {
    setValue(newDestworks[0]);
  }, [destNetworks]);

  let DestNetworkValue = {
    label: (
      <NetworkLabel
        isCenter={newDestworks.length < 2}
        icon={<NetWorkIcon chainId={value?.networkId} />}
        title={value?.name}
      />
    ),
    key: value?.networkId,
    data: value,
  };

  let DestNetworkList = newDestworks.map((item): FindoraListItemType => {
    return {
      label: (
        <NetworkLabel
          isCenter={newDestworks.length < 2}
          icon={<NetWorkIcon chainId={item?.networkId} />}
          title={item?.name}
        />
      ),
      key: item.networkId,
      data: item,
    };
  });

  function handleOnSelect(item: FindoraListItemType) {
    setValue(item.data);
  }
  async function handleSwitchNetwork() {
    try {
      await services.evmServer.switchNetwork(value);
      onCancel();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <section className="section-switch-network">
      <div className="circle-name-current">
        <span className="circle" /> <NetWorkIcon chainId={sourceNetworks[0]?.networkId} />
        <span>{sourceNetworks[0]?.name}</span>
      </div>
      <div className="is-switch">Allow this site to switch the network?</div>
      <div className="selected-network">
        This will switch the selected network within MetaMask to a previously added network:
      </div>
      <FindoraSelect
        className="switch-network-dest-select"
        value={DestNetworkValue}
        theme="light"
        menu={DestNetworkList}
        onSelect={handleOnSelect}
      />
      <div className="switch-pending">
        <span>Switching networks will cancel all pending confirmations</span>
        {/* <span> </span> */}
      </div>
      <div className="btn-group">
        <div
          className="cancel"
          onClick={() => {
            onCancel();
          }}
        >
          cancel
        </div>
        <FindoraButton onClick={handleSwitchNetwork}> Switch Networks</FindoraButton>
      </div>
    </section>
  );
};

SwitchNetwork.defaultProps = {
  onCancel: () => {},
  destNetworks: [],
  sourceNetworks: [],
};

export default SwitchNetwork;
