import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { ModalBackground } from 'containers/modal';

const MenuLink = ({ pageLink, pageName }) => (
  <li>
    <Link to={pageLink}>
      <span>{pageName}</span>
    </Link>
  </li>
);

MenuLink.propTypes = {
  pageLink: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
};

const Layout = ({ children }) => (
  <div>
    <h1>Redux architecture</h1>

    <ul>
      <MenuLink pageLink="/" pageName="Counter page" />
      <MenuLink pageLink="/multiple" pageName="Multiple page" />
      <MenuLink pageLink="/fetch" pageName="Fetcher page" />
      <MenuLink pageLink="/modal" pageName="Modal page" />
    </ul>

    {children}

    <ModalBackground />
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
