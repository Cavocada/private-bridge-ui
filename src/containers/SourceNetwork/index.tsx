import React from 'react';

import FindoraSelect from '_components/FindoraSelect';
import { FindoraListItemType } from '_components/FindoraList';
import NetworkLabel from '_components/NetworkLabel';
import { BridgeConfigSimple } from '_constants/ChainBridge.d';
import NetWorkIcon from '_containers/NetWorkIcon';

import './index.less';

export interface ISourceNetwork {
  value?: BridgeConfigSimple;
  dataList?: BridgeConfigSimple[];
  onChange?: (item: FindoraListItemType) => void;
}

const SourceNetwork: React.FC<ISourceNetwork> = ({ onChange, value, dataList }) => {
  const valueComponent = {
    label: <NetworkLabel icon={<NetWorkIcon chainId={value?.networkId} />} title={value?.name} />,
    key: value?.networkId,
    data: value,
  };

  function handleOnSelect(item: FindoraListItemType) {
    onChange(item.data);
  }

  return (
    <section className="section-network-source">
      <FindoraSelect value={valueComponent} disabled={true} onSelect={handleOnSelect} />
    </section>
  );
};
SourceNetwork.defaultProps = {
  value: null,
  dataList: [],
  onChange: () => {},
};
export default SourceNetwork;
