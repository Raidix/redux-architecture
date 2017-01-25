/*
* HOC для компонентов - страниц
* Отчищает список загруженных коллекций при Unmount
* Т.к. при переходе между страницами нужно все перефетчивать
* */

import React, { PureComponent } from 'react';
import { clearFetchedData } from 'components/data-fetcher-enhance/data-fetcher-enhance';

export default ComposedComponent => class PageComponentWrapper extends PureComponent {
  componentWillUnmount() {
    clearFetchedData();
  }

  render() {
    return <ComposedComponent {...this.props} />;
  }
};
