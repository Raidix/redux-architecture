import React from 'react';
import { Route } from 'react-router';
import {
  pageComponentEnhance,
  Layout,
  CounterPage,
  MultiplePage,
  FetchPage,
} from 'components';

// Все компоненты-страницы должны быть обернуты в pageComponentEnhance
// для того, чтобы при переходе между ними перефетчивались коллекции

export default (
  <Route component={Layout}>
    <Route path="/" component={pageComponentEnhance(CounterPage)} />
    <Route path="/multiple" component={pageComponentEnhance(MultiplePage)} />
    <Route path="/fetch" component={pageComponentEnhance(FetchPage)} />
  </Route>
);
