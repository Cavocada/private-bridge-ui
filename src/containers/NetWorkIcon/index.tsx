import React, { useEffect, useState } from 'react';

import NetWorkFra from '_assets/tokenLogo/fra.svg';
import NetWorkEth from '_assets/tokenLogo/eth.svg';
import NetWorkBsc from '_assets/tokenLogo/bsc.svg';
import NetWorkPolygon from '_assets/tokenLogo/polygon.png';

export interface INetWorkIcon {
  chainId: number;
}

const UnknownIcon = (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      width: '22px',
      height: '22px',
      border: '1px solid white',
      borderRadius: '11px',
      background: '#5e78eb33',
    }}
  >
    ?
  </div>
);

const Image = ({ src }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px' }}>
      <img src={src} style={{ width: '22px', height: '22px' }} alt="" />
    </div>
  );
};

const NetWorkIconConfig = {
  137: <Image src={NetWorkPolygon} />,
  525: <NetWorkFra />,
  524: <NetWorkFra />,
  2154: <NetWorkFra />,
  2153: <NetWorkFra />,
  2152: <NetWorkFra />,
  97: <NetWorkBsc />,
  56: <NetWorkBsc />,
  84531: <NetWorkEth />,
  3: <NetWorkEth />,
  1: <NetWorkEth />,
};

const NetWorkIcon: React.FC<INetWorkIcon> = ({ chainId }) => {
  return NetWorkIconConfig[chainId] ?? UnknownIcon;
};

NetWorkIcon.defaultProps = {
  chainId: undefined,
};

export default NetWorkIcon;
