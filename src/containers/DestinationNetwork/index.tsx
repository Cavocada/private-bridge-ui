import React from 'react';

import FindoraSelect from '_components/FindoraSelect';
import { FindoraListItemType } from '_components/FindoraList';
import NetworkLabel from '_components/NetworkLabel';
import { BridgeConfigSimple } from '_constants/ChainBridge.d';
import NetWorkIcon from '_containers/NetWorkIcon';

import './index.less';

export interface IDestinationNetwork {
  value?: BridgeConfigSimple;
  dataList?: BridgeConfigSimple[];
  onChange?: (item: BridgeConfigSimple) => void;
}

const DestinationNetwork: React.FC<IDestinationNetwork> = ({ onChange, value, dataList }) => {
  const valueComponent = {
    label: <NetworkLabel icon={<NetWorkIcon chainId={value?.networkId} />} title={value?.name} />,
    key: value?.networkId,
    data: value,
  };

  const menuComponent = dataList.map((item): FindoraListItemType => {
    return {
      label: <NetworkLabel icon={<NetWorkIcon chainId={item?.networkId} />} title={item?.name} />,
      key: item.networkId,
      data: item,
    };
  });

  function handleOnSelect(item: FindoraListItemType) {
    onChange(item.data);
  }

  return (
    <section className="section-network-dest">
      <FindoraSelect value={valueComponent} menu={menuComponent} onSelect={handleOnSelect} />
    </section>
  );
};

DestinationNetwork.defaultProps = {
  value: null,
  dataList: [],
  onChange: () => {},
};

export default DestinationNetwork;
