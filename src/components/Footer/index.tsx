import React from 'react';

// import LogoSvg from '_src/assets/images/logo.svg';
import TwitterSvg from '_src/assets/images/twitter.svg';
import Telegrame from '_src/assets/images/telegrame.svg';
import GithubSvg from '_src/assets/images/github.svg';
import MediumSvg from '_src/assets/images/medium.svg';

import './index.less';
// import { Link } from 'react-router-dom';
// import pageURL from '_constants/pageURL';

interface IFooter {}

export const Footer: React.FC<IFooter> = () => {
  return (
    <div className="footer">
      <footer className="footer-container">
        {/* <Link to={pageURL.home} className="logo">
          <LogoSvg />
        </Link> */}
        <div className="bottom">
          {/* <div className="about">
            <a href="https://twitter.com/findora" target="__blacnk">
              <TwitterSvg />
            </a>
            <a href="https://t.me/findoraen" target="__blacnk">
              <Telegrame />
            </a>
            <a href="https://github.com/findoranetwork" target="__blacnk">
              <GithubSvg />
            </a>
            <a href="https://medium.com/findorafoundation" target="__blacnk">
              <MediumSvg />
            </a>
          </div> */}
          <ul className="policy">
            <li>©2022 Rialto Bridge</li>
            <li>
              <a
                href="https://github.com/Cavocada/chainbridge-tools/wiki/About-Rialto-Bridge#terms-of-service"
                target="__blacnk"
              >
                Terms of Service
              </a>
              {/* <span>|</span> */}
            </li>
            {/* <li>
              <a href="https://findora.org/terms-of-use/" target="__blacnk">
                Policy
              </a>
              <span>|</span>
            </li>
            <li>
              <a href="https://findora.org/terms-of-use/" target="__blacnk">
                Terms of Use
              </a>
            </li> */}
          </ul>
        </div>
      </footer>
    </div>
  );
};
export const FooterM: React.FC<IFooter> = () => {
  return (
    <div className="footer-m">
      <footer className="footer-container">
        <div className="bottom">
          <ul className="policy">
            <li>©2022 Rialto Bridge</li>
            <li>
              <a
                href="https://github.com/Cavocada/chainbridge-tools/wiki/About-Rialto-Bridge#terms-of-service"
                target="__blacnk"
              >
                Terms of Use
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
