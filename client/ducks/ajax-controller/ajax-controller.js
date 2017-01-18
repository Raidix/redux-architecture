/*
* Модуль для работы с rest сервером.
* Загружает, парсит json. Обрабатывает ошибки.
* Исключает множественную загрузку одной коллекции
* */

import co from 'co';
import { Map } from 'immutable';
import { APPLICATION_NAME } from 'config';
import { fetcher } from 'tools';
import successHandler from './success-handler';
import errorHandler from './error-handler';

/*
* Constants
* */

export const MODULE_NAME = 'ajaxController';

// Action names
const REGISTER = `${APPLICATION_NAME}/${MODULE_NAME}/REGISTER`;
const RESET = `${APPLICATION_NAME}/${MODULE_NAME}/RESET`;
const UNREGISTER = `${APPLICATION_NAME}/${MODULE_NAME}/DELETE`;

/*
* Reducer
* */

const initialState = Map({});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return state.set(action.payload.moduleName, Map({ promise: action.payload.promise }));

    case RESET:
      // TODO: отмена promises
      return initialState;

    case UNREGISTER:
      // TODO: отмена promise
      return state.delete(action.payload.moduleName);

    default:
      return state;
  }
}

/*
* Actions
* */

const ajaxControllerRegisterDelta = ({ moduleName, promise }) => ({ type: REGISTER, payload: { moduleName, promise } });
const ajaxControlleUnregisterDelta = ({ moduleName }) => ({ type: UNREGISTER, payload: { moduleName } });

// TODO: обобщить для всех методов REST
// TODO: защита от множественного fetch
const ajaxControllerFetchSignal = (url, fetcherOptions = {}, signalOptions = {}) =>
  (dispatch, getState) => co(function* get() {
    const method = fetcherOptions.method || 'GET';
    const { moduleName, silent = false, force = false } = signalOptions;
    const currentModuleData = getState()[MODULE_NAME].get(moduleName);

    // проверяем регистрацию
    if (method === 'GET' && currentModuleData !== undefined && !force) {
      // возвращаем предыдущий ответ
      return currentModuleData.get('promise');
    }

    // выболняем ajax запрос
    const { status, data, error } = yield fetcher(url, fetcherOptions);
    let promise;

    if (error === undefined && status === 200) {
      promise = co(successHandler(dispatch, { status, data, url, method, fetcherOptions, signalOptions }));
    } else {
      promise = co(errorHandler(dispatch, { status, data, url, method, fetcherOptions, signalOptions }));
    }

    // зарегистрируем модуль
    if (method === 'GET' && !silent) {
      dispatch(ajaxControllerRegisterDelta({ moduleName, promise }));
    }

    return promise;
  });

export const actions = {
  ajaxControllerFetchSignal,
  ajaxControlleUnregisterDelta,
};
