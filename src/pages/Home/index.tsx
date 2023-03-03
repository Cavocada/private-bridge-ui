import 'antd/dist/antd.css';
import React from 'react';
import { useHistory } from 'react-router';
import pageURL from '_constants/pageURL';
import ConnectWallet from '_containers/ConnectWallet';
import Help from '_containers/Help';
import HomeWalletSvg from '_src/assets/images/home_wallet_new_svg.svg';
import HomeWalletMSvg from '_src/assets/images/home_wallet_new_m_svg.svg';
import { isMobile } from '_utils/userAgent';
import './index.less';
import Footer from '_components/Footer';

function Home() {
  const history = useHistory();

  return (
    <div className="home-page">
      <div className="page-container">
        <div className="home-info">
          <div className="title">Transfer Assets from Ethereum and BNB Smart Chain to Findora Blockchain</div>
          {/* <div className="title" style={{ marginBottom: '28px' }}>
            Rialto Bridge
          </div> */}
          {/* <div className="sub-title" style={{ marginBottom: '30px' }}>
            Transfer Assets Between BNB Chain and Findora Blockchain
          </div> */}
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
        {isMobile ? <HomeWalletMSvg className="icon-home-wallet" /> : <HomeWalletSvg className="icon-home-wallet" />}
        <Footer />
      </div>
    </div>
  );
}
export default Home;
