import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConnectWallet from '_containers/ConnectWallet';
import LogoMain from '_assets/images/logo.png';
import MenuUnfoldOutlined from '_src/assets/images/menu.svg';
import MenuFoldOutlined from '_src/assets/images/menu_fold.svg';
import pageURL from '_constants/pageURL';
import {Button, Dropdown, Image, Layout, Menu, Space} from 'antd';
import { enquireScreen } from 'enquire-js';
const { Header } = Layout;
import { FooterM } from '_components/Footer';
import './index.less';


const Headerpage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [current, setCurrent] = useState('mail');
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    enquireScreen((b) => {
      setIsMobile(!!b);
    });
  }, []);

  const pcNav = [
    {
      label: <ConnectWallet style={{ marginLeft: '20px' }} />,
      key: 'wallet',
    },
  ];
  const MNav = [
    {
      label: <FooterM />,
      key: 'footer',
    },
  ];

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Header className="header">
        <Image src={LogoMain}/>
        {isMobile ? (
          <Space align="center" size={20}>
            <ConnectWallet />
            <Dropdown
              overlay={
                <Menu
                  onClick={onClick}
                  selectedKeys={[current]}
                  mode="horizontal"
                  items={MNav}
                  className="dropdown-nav"
                />
              }
              overlayStyle={{ width: '100%' }}
              trigger={['click']}
              open={collapsed}
            >
              <Button
                type="link"
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
                style={{ padding: 0, height: '64px', alignItems: 'center', display: 'flex' }}
              >
                {collapsed ? (
                  <MenuFoldOutlined style={{ color: '#fff' }} />
                ) : (
                  <MenuUnfoldOutlined style={{ color: '#fff' }} />
                )}
              </Button>
            </Dropdown>
          </Space>
        ) : (
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={pcNav} />
        )}
      </Header>
    </>
  );
};

export default Headerpage;
