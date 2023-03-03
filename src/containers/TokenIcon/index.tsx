import React, { useEffect, useState } from 'react';

import NetWorkBSC from '_assets/tokenLogo/bsc.svg';
import NetWorkBTC from '_assets/tokenLogo/btc.svg';
import NetWorkBusd from '_assets/tokenLogo/busd.svg';
import NetWorkEth from '_assets/tokenLogo/eth.svg';
import NetWorkFra from '_assets/tokenLogo/fra.svg';
import NetWorkUsdc from '_assets/tokenLogo/usdc.svg';
import NetWorkUsdt from '_assets/tokenLogo/usdt.svg';
import NetWorkBnb from '_assets/tokenLogo/bnb.svg';

export interface ITokenIcon {
  imageUri: string;
}

const TokenIconConfig = {
  BSCIcon: <NetWorkBSC />,
  BTCIcon: <NetWorkBTC />,
  BUSDIcon: <NetWorkBusd />,
  ETHIcon: <NetWorkEth />,
  FRAIcon: <NetWorkFra />,
  USDCIcon: <NetWorkUsdc />,
  USDTIcon: <NetWorkUsdt />,
  BNBIcon: <NetWorkBnb />,
};

const TokenIcon: React.FC<ITokenIcon> = ({ imageUri }) => {
  return TokenIconConfig[imageUri] ?? null;
};

TokenIcon.defaultProps = {
  imageUri: undefined,
};

export default TokenIcon;
