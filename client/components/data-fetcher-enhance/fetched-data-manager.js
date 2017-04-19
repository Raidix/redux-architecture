/*
* @key = fetch action name
* @value = fetch promise
* */

let fetchedData = {};

export default {
  clearFetchedData() {
    Object.keys(fetchedData).forEach((fetchActionName) => {
      fetchedData[fetchActionName].cancel();
    });

    fetchedData = {};
  },

  getFetchedData() {
    return fetchedData;
  },
};
