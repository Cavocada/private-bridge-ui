import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import './index.less';

export interface IFindoraTab {
  tabList: React.ReactNode[];
  className?: string;
  onChange?: (string) => void;
}

const FindoraTab: React.FC<IFindoraTab> = ({ tabList, className, onChange }) => {
  const [curTab, setCurTab] = useState(tabList[0]);

  useEffect(() => {
    onChange(curTab);
  }, [curTab]);

  function handleOnClickTab(tab) {
    return () => {
      setCurTab(tab);
    };
  }
  return (
    <ul className={classNames('fra-components-tab', className)}>
      {tabList.length > 0 &&
        tabList.map((item, index) => {
          return (
            <li key={index} className={classNames({ active: curTab === item })} onClick={handleOnClickTab(item)}>
              {item}
            </li>
          );
        })}
    </ul>
  );
};

FindoraTab.defaultProps = {
  tabList: [],
  className: '',
  onChange: () => {},
};
export default FindoraTab;
