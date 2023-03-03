import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Routes from '_src/routes';

import i18n from '_utils/i18n';
import { WebLayout } from '_src/Layout';

// antd 组件库 多语言
import antdEnUS from 'antd/lib/locale/en_US';
import antdZhCN from 'antd/lib/locale/zh_CN';

import '_assets/less/index.less';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 5000;
  return library;
}

const Root = () => {
  return (
    <RecoilRoot>
      <ConfigProvider locale={i18n.language === 'zhCN' ? antdZhCN : antdEnUS}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <BrowserRouter>
            <WebLayout>
              <Routes />
            </WebLayout>
          </BrowserRouter>
        </Web3ReactProvider>
      </ConfigProvider>
    </RecoilRoot>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
