import React from 'react';
import classNames from 'classnames';

import './index.less';

export interface INetworkLabel {
  className?: string;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  isCenter?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const NetworkLabel: React.FC<INetworkLabel> = ({ className, icon, isCenter, title, ...props }) => {
  return (
    <div className={classNames('fra-components-network-label', className, { center: isCenter })} {...props}>
      <div className="label-icon">{icon}</div>
      <div className="label-text">{title}</div>
    </div>
  );
};

NetworkLabel.defaultProps = {
  className: '',
  onClick: () => {},
  isCenter: false,
};
export default NetworkLabel;
