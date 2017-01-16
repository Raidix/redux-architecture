import React from 'react';
import { Route } from 'react-router';
import {
  Layout,
  MainPage,
  CounterPage,
  MultiplePage,
} from 'components';

export default (
  <Route component={Layout}>
    <Route path="/" component={MainPage} />
    <Route path="/counter" component={CounterPage} />
    <Route path="/multiple" component={MultiplePage} />
  </Route>
);
