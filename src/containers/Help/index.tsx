import React, { useState } from 'react';
import { Drawer } from 'antd';
import classNames from 'classnames';
import useMedia from 'use-media';

import HelpSvg from '_src/assets/images/help.svg';
import FindoraButton from '_components/FindoraButton';
import { useRecoilState } from 'recoil';
import stores from '_src/stores';
import './index.less';

export interface IHelp {
  className?: string;
}

const Help: React.FC<IHelp> = ({ className }) => {
  // const [visible, setVisible] = useState(false);
  const [visible, setVisible] = useRecoilState<boolean>(stores.showHelp);
  const isH5 = useMedia({ maxWidth: 700 });
  return (
    <section className={classNames('section-help', className)}>
      <div className="help-item" onClick={() => setVisible(true)}>
        <span style={{ marginRight: '6px' }}>Help</span> <HelpSvg />
      </div>
      <Drawer
        width={isH5 ? '100%' : 440}
        placement="left"
        className="help-drawer"
        closable
        getContainer={false}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        {/* <div className="help-drawer-box">
          <h3>What is Privacy Bridge?</h3>
          <p>
            Privacy Bridge is a modular multi-directional blockchain bridge to allow data and value transfer between any
            number of blockchains. This should enable users to specify a destination blockchain from their source chain
            and send data to that blockchain for consumption on the destination chain.
          </p>
          <p>
            This could be a token that is locked on Chain A and redeemed on Chain B, or an operation that is executed on
            a destination chain and initiated on the source chain.
          </p>
          <FindoraButton className="btn-close" onClick={() => setVisible(false)}>
            Close
          </FindoraButton>
        </div> */}
      </Drawer>
    </section>
  );
};

export default Help;
