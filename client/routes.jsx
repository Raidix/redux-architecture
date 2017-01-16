import React from 'react';
import { Route } from 'react-router';
import {
  Counter,
} from 'containers';

export default (
  <Route>
    <Route path="/" component={Counter} />
  </Route>
);
