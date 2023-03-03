import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import './index.less';

export interface FindoraListItemType {
  label: React.ReactNode;
  key: string | number;
  data?: any;
}

export interface IFindoraList {
  className?: string;
  onChange?: (item: FindoraListItemType) => void;
  data?: FindoraListItemType[];
  theme?: 'light' | 'dark';
}

const FindoraList: React.FC<IFindoraList> = ({ className, data, onChange, theme, ...props }) => {
  return data.length > 0 ? (
    <div className={classNames('fra-components-list', className, theme)} {...props}>
      {data.map((item) => {
        return (
          <div
            className="list-item"
            onClick={() => {
              onChange(item);
            }}
            key={item.key}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  ) : null;
};

FindoraList.defaultProps = {
  className: '',
  theme: 'dark',
  onChange: () => {},
  data: [],
};
export default FindoraList;
