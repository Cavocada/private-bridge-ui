import React, { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { InputProps } from 'antd';
import FindoraInput from '_components/FindoraInput';

import './index.less';

export interface IFindoraInputNumberProps {
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  value?: string;
  precision?: number;
  placeholder?: string;
  addonAfter?: JSX.Element;
  addonUnit?: JSX.Element;
  size?: InputProps['size'];
  className?: string;
  defaultValue?: string;
}

const FindoraInputNumber: React.FC<IFindoraInputNumberProps> = ({
  onChange,
  onBlur,
  value,
  precision,
  placeholder,
  addonUnit,
  addonAfter,
  defaultValue,
  ...props
}) => {
  const [amount, setAmount] = useState<string>('');

  useEffect(() => {
    setAmount(value);
  }, [value]);

  function handleChange(_value) {
    setAmount(_value);
  }

  function handleBlur(_value) {
    const errorValue = 'undefined';

    let tmpValue = String(_value).trim();

    if (tmpValue === '') {
      tmpValue = errorValue;
    }

    if (tmpValue === '.') {
      tmpValue = errorValue;
    }

    if (!/^((\d*\.\d*)|(\d*))$/.test(tmpValue)) {
      setAmount('');
      onChange('');
    } else {
      const _amount = new BigNumber(tmpValue).toString();
      setAmount(_amount);
      onChange(_amount);
    }
  }
  return (
    <FindoraInput
      value={amount}
      onChange={handleChange}
      placeholder={placeholder}
      onBlur={handleBlur}
      // addonAfterMenu={addonUnit}
      addonAfter={addonAfter}
      {...props}
    />
  );
};

FindoraInputNumber.defaultProps = {
  precision: 18,
  addonUnit: null,
};

export default FindoraInputNumber;
