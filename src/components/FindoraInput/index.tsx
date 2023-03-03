import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import './index.less';
export interface IFindoraInput {
  className?: string;
  value?: string;
  placeholder?: string;
  addonAfter?: React.ReactNode;
  addonAfterMenu?: React.ReactNode;
  onChange?: (val: string) => void;
  onBlur?: (val: string) => void;
}

const FindoraInput: React.FC<IFindoraInput> = ({
  className,
  children,
  addonAfter,
  addonAfterMenu,
  value,
  onChange,
  onBlur,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    inputRef.current.value = value;
  }, [inputRef.current, value]);

  return (
    <div className={classNames('fra-components-input', className)}>
      <div className="input-box">
        <input
          autoComplete="off"
          ref={inputRef}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onBlur={(e) => {
            onBlur(e.target.value);
          }}
          {...props}
        />
        {addonAfter}
      </div>
    </div>
  );
};

FindoraInput.defaultProps = {
  className: '',
  value: '',
  placeholder: '',
  addonAfter: null,
  addonAfterMenu: null,
  onChange: () => {},
  onBlur: () => {},
};
export default FindoraInput;
