/*
* HOC для предзагрузки данных для компонента
* */

import React, { PureComponent } from 'react';
import Preloader from './preloader';
import fetchedDataManager from './fetched-data-manager';

export default (ComposedComponent, fetchActionNames, CustomPreloader) =>
  class DataFetcherWrapper extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isLoading: true,
      };
    }

    componentWillMount() {
      const promises = [];
      const fetchedData = fetchedDataManager.getFetchedData();

      fetchActionNames.forEach((fetchActionName) => {
        if (!fetchedData[fetchActionName]) {
          fetchedData[fetchActionName] = this.props[fetchActionName]();
        }

        promises.push(fetchedData[fetchActionName]);
      });

      Promise.all(promises).then(() => {
        this.setState({ isLoading: false });
      });
    }

    render() {
      const CurrentPreloader = CustomPreloader || Preloader;

      return this.state.isLoading ?
        <CurrentPreloader /> :
        <ComposedComponent {...this.props} />;
    }
  };
