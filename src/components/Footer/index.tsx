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
        <div className="bottom">
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
