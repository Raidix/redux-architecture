/*
* Специфичный для проекта обработчик ошибок ajax запросов
* */

/* eslint-disable require-yield */

// TODO: silent

function* errorHandler(dispatch, { status, data, error, method }) {
  switch (status) {
    case 502:
    case 503: {
      // if (!model.isRemote) {
      //   user.trigger('logout', { isUnavailable: true });
      // }

      alert('logout'); // eslint-disable-line no-alert

      return { status, data, originalData: data, error, isSuccess: false };
    }

    case 401: {
      // if (model.type !== 'auth') {
      //   user.trigger('logout');
      // }

      alert('logout'); // eslint-disable-line no-alert

      return { status, data, originalData: data, error, isSuccess: false };
    }

    default: {
      if (method !== 'GET') {
        // TODO: show modal with error
        // const args = data.args;
        // const message = data.msg;
        // const isRemote = data.remote === 1;
        // let errorMessage;
        //
        // if (message === '') {
        //   errorMessage = $.t('unknown_error');
        // } else {
        //   errorMessage = i18n.exists(`errmsgs:${message}`) ?
        //     $.t(`errmsgs:${message}`, args) : message;
        // }
        //
        // alert(errorMessage); // eslint-disable-line no-alert

        alert('unknown error'); // eslint-disable-line no-alert
      }

      return { status, data, originalData: data, error, isSuccess: false };
    }
  }
}

export default errorHandler;
