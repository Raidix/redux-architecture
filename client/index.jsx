import React from 'react';
import { render } from 'react-dom';
import Root from 'containers/root';
import configureStore from 'store/configure-store';
import { AppContainer } from 'react-hot-loader';
import Promise from 'bluebird';

import '../scss/app.scss';

// Подмена Promise из babel на bluebird
Promise.config({ cancellation: true });
require('babel-runtime/core-js/promise').default = Promise; // eslint-disable-line

const store = configureStore();
const rootElement = document.getElementById('root');

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  rootElement,
);

if (module.hot) {
  module.hot.accept('containers/root', () => {
    // eslint-disable-next-line global-require
    const NewRoot = require('containers/root').default;

    render(
      <AppContainer>
        <NewRoot store={store} />
      </AppContainer>,
      rootElement,
    );
  });
}
