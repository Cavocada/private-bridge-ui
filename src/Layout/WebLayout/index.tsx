import React from 'react';
import Header from '_components/Header';
import Footer from '_components/Footer';

import './index.less';

const WebLayout: React.FC = ({ children }) => {
  return (
    <div className="web-container">
      <Header />
      <div className="web-container-body">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default WebLayout;
