import React from 'react';
import classNames from 'classnames';

import './index.less';

export interface ILabel {
  className?: string;
}

const Label: React.FC<ILabel> = ({ className, children }) => {
  return <div className={classNames('fra-components-label', className)}>{children}</div>;
};

Label.defaultProps = {
  className: '',
};
export default Label;
