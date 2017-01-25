/*
* Специфичный для проекта обработчик ошибок ajax запросов
* */

/* eslint-disable require-yield */

// TODO: silent

function* errorHandler(dispatch, { status, data, error, method, isAborted }) {
  // Ignore aborts
  if (isAborted) {
    return {
      status,
      data,
      originalData: data,
      error,
    };
  }

  if (error) {
    // TODO: connection error
    alert('Error'); // eslint-disable-line no-alert
  }

  switch (status) {
    case 502:
    case 503: {
      // TODO: server error
      alert('Error'); // eslint-disable-line no-alert

      return {
        status,
        data,
        originalData: data,
        error,
      };
    }

    case 401: {
      // TODO: logout
      alert('logout'); // eslint-disable-line no-alert

      return {
        status,
        data,
        originalData: data,
        error,
      };
    }

    default: {
      if (method !== 'GET') {
        // TODO: show modal with error
        alert('unknown error'); // eslint-disable-line no-alert
      }

      return {
        status,
        data,
        originalData: data,
        error,
      };
    }
  }
}

export default errorHandler;
