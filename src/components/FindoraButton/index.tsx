import React from 'react';
import classNames from 'classnames';

import './index.less';

export interface IFindoraButton {
  className?: string;
  onClick?: () => void;
}

const FindoraButton: React.FC<IFindoraButton> = ({ className, children, ...props }) => {
  return (
    <div className={classNames('fra-components-button', className)} {...props}>
      {children}
    </div>
  );
};

FindoraButton.defaultProps = {
  className: '',
  onClick: () => {},
};
export default FindoraButton;
