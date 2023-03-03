import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConnectWallet from '_containers/ConnectWallet';
import LogoSvg from '_src/assets/images/logo.svg';
import LogoMSvg from '_src/assets/images/logo_m.svg';
import MenuUnfoldOutlined from '_src/assets/images/menu.svg';
import MenuFoldOutlined from '_src/assets/images/menu_fold.svg';
import pageURL from '_constants/pageURL';
import { Button, Dropdown, Layout, Menu, Space } from 'antd';
import { enquireScreen } from 'enquire-js';
import styled from 'styled-components';
const { Header } = Layout;
import { FooterM } from '_components/Footer';
import './index.less';

const Logo = styled.div`
  width: 200px;
  height: 30.7px;
  @media screen and (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

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
      label: (
        <a href="https://github.com/Cavocada/chainbridge-tools/wiki/About-Rialto-Bridge" target={'_blank'}>
          About
        </a>
      ),
      key: 'about',
    },
    {
      label: (
        <a href="https://github.com/Cavocada/chainbridge-tools/wiki/FAQ" target={'_blank'}>
          FAQs
        </a>
      ),
      key: 'faqs',
    },
    {
      label: (
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSetTdfEU8TJ34cMnbv7SZyUXnZ0a2E2TI-nU2q_jLN0wZGRQw/viewform?usp=send_form"
          target={'_blank'}
        >
          Listing Request
        </a>
      ),
      key: 'request',
    },
    {
      label: <ConnectWallet style={{ marginLeft: '20px' }} />,
      key: 'wallet',
    },
  ];
  const MNav = [
    {
      label: (
        <a href="https://github.com/Cavocada/chainbridge-tools/wiki/About-Rialto-Bridge" target={'_blank'}>
          About
        </a>
      ),
      key: 'about',
    },
    {
      label: (
        <a href="https://github.com/Cavocada/chainbridge-tools/wiki/FAQ" target={'_blank'}>
          FAQs
        </a>
      ),
      key: 'faqs',
    },
    {
      label: (
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSetTdfEU8TJ34cMnbv7SZyUXnZ0a2E2TI-nU2q_jLN0wZGRQw/viewform?usp=send_form"
          target={'_blank'}
        >
          Listing Request
        </a>
      ),
      key: 'request',
    },
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
        <Logo>
          <Link to={pageURL.home} style={{ display: 'contents' }} className="logo">
            {isMobile ? <LogoMSvg /> : <LogoSvg />}
          </Link>
        </Logo>

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
