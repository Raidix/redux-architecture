import React from 'react';
import { Route } from 'react-router';
import pageComponentEnhance from 'components/page-component-enhance';
import App from 'components/app';
import CounterPage from 'components/pages/counter';
import MultiplePage from 'components/pages/multiple';
import FetchPage from 'components/pages/fetch';
import ModalPage from 'containers/pages/modal';

// Все компоненты-страницы должны быть обернуты в pageComponentEnhance
// для того, чтобы при переходе между ними перефетчивались коллекции

export default (
  <Route component={App}>
    <Route path="/" component={pageComponentEnhance(CounterPage)} />
    <Route path="/multiple" component={pageComponentEnhance(MultiplePage)} />
    <Route path="/fetch" component={pageComponentEnhance(FetchPage)} />
    <Route path="/modal" component={pageComponentEnhance(ModalPage)} />
  </Route>
);
