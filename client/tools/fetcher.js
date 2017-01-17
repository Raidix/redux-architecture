import fetch from 'isomorphic-fetch';

/*
* Обертка на fetch, котрая никогда не реджектится и
* резолвится объектом вида { status, data, error }
* */

const fetcher = (url, options = {}) => new Promise((resolve) => {
  fetch(url, Object.assign({}, {
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }, options))
  .then((response) => {
    const status = +response.status;

    response.json()
    .then(data => resolve({ status, data }))
    .catch(error => resolve({ status, error }));
  })
  .catch(error => resolve({ error }));
});

export default fetcher;
