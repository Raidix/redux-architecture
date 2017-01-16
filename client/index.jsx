import { polyfill } from 'es6-promise';
import React from 'react';
import { render } from 'react-dom';
import Root from 'containers/root/root';
import configureStore from 'store/configure-store';

polyfill();

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('root'),
);
