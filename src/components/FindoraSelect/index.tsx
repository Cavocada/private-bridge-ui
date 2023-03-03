import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Dropdown } from 'antd';

import FindoraList, { FindoraListItemType } from '_components/FindoraList';
import ArrowSvg from '_src/assets/images/arrow2.svg';

import './index.less';

export interface IFindoraSelect {
  className?: string;
  value?: FindoraListItemType;
  theme?: 'light' | 'dark';
  onSelect?: (FindoraListItemType) => void;
  menu?: FindoraListItemType[];
  disabled?: boolean;
  arrow?: boolean;
}

const FindoraSelect: React.FC<IFindoraSelect> = ({
  className,
  value,
  theme,
  menu,
  disabled,
  arrow,
  children,
  onSelect,
  ...props
}) => {
  const [currentMenu, setCurrentMenu] = useState<FindoraListItemType>(value);
  const isArrow = arrow ? menu.length > 1 : arrow;

  useEffect(() => {
    if (currentMenu.key !== value.key) {
      setCurrentMenu(value);
    }
  }, [value]);

  const menuList = menu.filter((item) => item.key !== value.key);

  function handleOnChangeMenu(item: FindoraListItemType) {
    onSelect(item);
    setCurrentMenu(item);
  }

  return (
    <div className={classNames('fra-components-select', className)}>
      <Dropdown
        overlay={<FindoraList theme={theme} data={menuList} onChange={handleOnChangeMenu} />}
        placement="bottomCenter"
        disabled={disabled}
        {...props}
      >
        <div className={classNames('select-label', { disabled })}>
          {currentMenu?.label}
          {isArrow && <ArrowSvg width={14} />}
        </div>
      </Dropdown>
    </div>
  );
};

FindoraSelect.defaultProps = {
  className: '',
  theme: 'dark',
  onSelect: () => {},
  value: null,
  menu: [],
  disabled: false,
  arrow: true,
};
export default FindoraSelect;
