import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import classNames from 'classnames';
import ArrowSvg from '_src/assets/images/arrow2.svg';
import FindoraList, { FindoraListItemType } from '_components/FindoraList';
import './index.less';
interface ModalProps {
  isOpen?: boolean;
  minHeight?: number | false;
  maxHeight?: number;
  initialFocusRef?: React.RefObject<any>;
  children?: React.ReactNode;
  title?: string;
  closable?: boolean;
  value: FindoraListItemType;
  className?: string;
  arrow?: boolean;
  theme?: 'light' | 'dark';
  menu?: FindoraListItemType[];
  disabled?: boolean;
  onSelect?: (FindoraListItemType) => void;
  footer?: boolean;
  width?: number;
}

const MyModal: React.FC<ModalProps> = ({
  isOpen,
  minHeight = false,
  maxHeight = 90,
  initialFocusRef,
  children,
  width,
  title,
  closable,
  value,
  onSelect,
  className,
  arrow,
  menu,
  theme,
  disabled,
  footer = false,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(isOpen);
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
    setIsModalVisible(false);
  }

  return (
    <div className={classNames('fra-components-select', className)}>
      <div
        className={classNames('select-label', { disabled })}
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        {currentMenu?.label}
        {isArrow && <ArrowSvg width={14} />}
      </div>
      <Modal
        width={width}
        title={title}
        visible={isModalVisible}
        bodyStyle={{ padding: '15px', background: '#162334' }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        closable={closable}
        footer={footer}
      >
        {menuList.map((item) => (
          <p
            className="modale-item"
            key={item.key}
            onClick={() => {
              handleOnChangeMenu(item);
            }}
          >
            {item.label}
          </p>
        ))}
      </Modal>
    </div>
  );
};
MyModal.defaultProps = {
  className: '',
  theme: 'dark',
  value: null,
  menu: [],
  disabled: false,
  arrow: true,
};
export default MyModal;
