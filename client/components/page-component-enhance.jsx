/*
* HOC для компонентов - страниц
* Отчищает список загруженных коллекций при Unmount
* Т.к. при переходе между страницами нужно все перефетчивать
* */

import React, { PureComponent } from 'react';
import { fetchedDataManager } from 'components/data-fetcher-enhance';

export default ComposedComponent => class PageComponentWrapper extends PureComponent {
  componentWillUnmount() {
    fetchedDataManager.clearFetchedData();
  }

  render() {
    return <ComposedComponent {...this.props} />;
  }
};
