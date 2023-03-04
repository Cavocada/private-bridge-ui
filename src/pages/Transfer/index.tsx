import React, { useState } from 'react';

import FindoraTab from '_components/FindoraTab';
import Cross from './Cross';
import Wrap from './Wrap';

import './index.less';

function Transfer() {
  const tabList = ['Cross Chain']; // , 'Wrap/Unwrap'
  const [tab, setTab] = useState(tabList[0]);

  return (
    <div className="transfer-page">
      <FindoraTab
        tabList={tabList}
        className="transfer-tab"
        onChange={(item) => {
          setTab(item);
        }}
      />

      <div className="transfer-container">{tab === tabList[0] ? <Cross /> : <Wrap />}</div>

    </div>
  );
}
export default Transfer;
