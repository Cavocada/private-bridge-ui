import React, { useEffect, useState } from 'react';

import FindoraInputNumber from '_components/FindoraInputNumber';
import FindoraSelect from '_components/FindoraSelect';
import Modal from '_components/Modal';
import NetworkLabel from '_components/NetworkLabel';
import { FindoraListItemType } from '_components/FindoraList';
import { BridgeConfigSimple, TokenConfig } from '_constants/ChainBridge.d';
import TokenIcon from '_containers/TokenIcon';

import './index.less';

export type TypeValue = TokenConfig & { amount: string };

interface IInputAmount {
  units: BridgeConfigSimple;
  desNetwork: BridgeConfigSimple;
  onChange?: (val: TypeValue) => void;
  onMaxAmount?: () => void;
  value?: TypeValue;
}

const InputAmount: React.FC<IInputAmount> = ({ units, desNetwork, onChange, onMaxAmount, value, ...props }) => {
  // const [newValue, setNewValue] = useState(value);
  // useEffect(() => {
  //   setNewValue(value);
  // }, [value]);

  const tokenValueComponent = {
    label: (
      <NetworkLabel
        icon={<TokenIcon imageUri={value?.imageUri} />}
        title={value?.name}
        style={{ marginRight: '10px' }}
      />
    ),
    key: value?.name,
    data: value,
  };

  const unitsComponent =
    units?.tokens
      .filter((item) => item.chainId.includes(desNetwork?.chainId))
      .map((item) => {
        return {
          label: (
            <NetworkLabel
              icon={<TokenIcon imageUri={item?.imageUri} />}
              style={{ marginRight: '10px' }}
              title={item?.name}
            />
          ),
          key: item?.name,
          data: item,
        };
      }) ?? [];

  function handleOnSelectToken(item: FindoraListItemType) {
    onChange(item.data);
  }

  function handleOnChangeAmount(amount) {
    onChange({ ...value, amount });
  }
  return (
    <>
      {/* <FindoraSelect
        className="input-tokens"
        value={tokenValueComponent}
        menu={unitsComponent}
        onSelect={handleOnSelectToken}
      /> */}
      <Modal
        className="input-tokens"
        value={tokenValueComponent}
        menu={unitsComponent}
        title="Please choose"
        width={400}
        onSelect={handleOnSelectToken}
      />
      <span className="laber">Enter amount to send</span>
      <FindoraInputNumber
        addonAfter={
          <div
            className="max-all"
            onClick={() => {
              onMaxAmount();
            }}
          >
            MAX
          </div>
        }
        // addonUnit={}
        onChange={handleOnChangeAmount}
        className="input-amount-container"
        value={value?.amount}
        precision={units?.decimals}
        placeholder="0.0"
        {...props}
      />
    </>
  );
};

InputAmount.defaultProps = {
  units: null,
  desNetwork: null,
  value: null,
  onChange: () => {},
  onMaxAmount: () => {},
};

export default InputAmount;
