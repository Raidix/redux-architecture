/* eslint-disable react/no-children-prop */
import React from 'react';
import { Provider } from 'react-redux';
import storeShape from 'store/shape';
import { Router, browserHistory } from 'react-router';
import routes from 'routes';

const Root = ({ store }) => (
  <Provider store={store} key="provider">
    <Router history={browserHistory} children={routes} />
  </Provider>
);

Root.propTypes = {
  store: storeShape.isRequired,
};

export default Root;
