import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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
      <MenuLink pageLink="/" pageName="Index page" />
      <MenuLink pageLink="/counter" pageName="Counter page" />
      <MenuLink pageLink="/multiple" pageName="Multiple page" />
    </ul>

    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
