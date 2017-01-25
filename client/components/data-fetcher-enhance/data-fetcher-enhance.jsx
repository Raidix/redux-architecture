/*
* HOC для предзагрузки данных для компонента
* */

import React, { PureComponent } from 'react';
import Preloader from './preloader';

/*
* @key = fetch action name
* @value = fetch promise
* */

let fetchedData = {};

// Clear fetched data and abort promises
export const clearFetchedData = () => {
  Object.keys(fetchedData).forEach((fetchActionName) => {
    fetchedData[fetchActionName].cancel();
  });

  fetchedData = {};
};

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
