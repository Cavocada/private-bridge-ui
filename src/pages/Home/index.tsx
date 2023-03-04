import 'antd/dist/antd.css';
import React from 'react';
import { useHistory } from 'react-router';
import pageURL from '_constants/pageURL';
import ConnectWallet from '_containers/ConnectWallet';
import { isMobile } from '_utils/userAgent';
import './index.less';
import Footer from '_components/Footer';

function Home() {
  const history = useHistory();

  return (
    <div className="home-page">
      <div className="page-container">
        <div className="home-info">
          <ConnectWallet typeUI="metamask" className="home-connect-btn">
            <span
              onClick={() => history.push(pageURL.transfer)}
              style={{ width: '100%', lineHeight: '60px', textAlign: 'center' }}
            >
              Enter APP
            </span>
          </ConnectWallet>
          {/* <Help className="home-help-btn" /> */}
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default Home;
