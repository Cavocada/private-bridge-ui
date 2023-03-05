import React, { useState } from 'react';
import { Modal } from 'antd';
import { useRecoilValue } from 'recoil';
import useMedia from 'use-media';

import SwitchNetwork from '_components/SwitchNetwork';
import { BridgeConfigSimple } from '_constants/ChainBridge.d';
import stores from '_src/stores';

import './index.less';

export interface IChangeNetwork {}

const ChangeNetwork: React.FC<IChangeNetwork> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const sourceNetworks: BridgeConfigSimple[] = useRecoilValue(stores.sourceNetwork);
  const destNetworks: BridgeConfigSimple[] = useRecoilValue(stores.destNetwork);
  const isH5 = useMedia({ maxWidth: 700 });
  return (
    <section className="section-change-network">
      <div
        className="change-name"
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        change
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        width={isH5 ? '94%' : 434}
        centered
        closable={false}
        title={null}
        bodyStyle={{ padding: '0' }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        <SwitchNetwork
          sourceNetworks={sourceNetworks}
          destNetworks={destNetworks}
          onCancel={() => {
            setIsModalVisible(false);
          }}
        />
      </Modal>
    </section>
  );
};

ChangeNetwork.defaultProps = {};

export default ChangeNetwork;
