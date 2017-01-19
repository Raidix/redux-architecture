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
const UNREGISTER = `${APPLICATION_NAME}/${MODULE_NAME}/UNREGISTER`;
const MARK_AS_SAVED = `${APPLICATION_NAME}/${MODULE_NAME}/MARK_AS_SAVED`;
const RESET = `${APPLICATION_NAME}/${MODULE_NAME}/RESET`;

/*
* Reducer
* */

const initialState = Map({});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return state.set(action.payload.moduleName, Map({
        promise: action.payload.promise,
        isAlreadySavedInStore: false,
      }));

    case UNREGISTER:
      // TODO: отмена promise
      return state.delete(action.payload.moduleName);

    case MARK_AS_SAVED:
      return state.setIn([action.payload.moduleName, 'isAlreadySavedInStore'], true);

    case RESET:
      // TODO: отмена promises
      return initialState;

    default:
      return state;
  }
}

/*
* Actions
* */

const ajaxControllerRegisterDelta = ({ moduleName, promise }) => ({ type: REGISTER, payload: { moduleName, promise } });
const ajaxControllerUnregisterDelta = ({ moduleName }) => ({ type: UNREGISTER, payload: { moduleName } });
const ajaxControllerMarkAsSavedDelta = ({ moduleName }) => ({ type: MARK_AS_SAVED, payload: { moduleName } });

// Делает запрос к серверу, производит дэфолтную обработку ошибок.
// Защищает от повторной загрузки коллекций/моделей
const ajaxControllerFetchSignal = (url, fetcherOptions = {}, signalOptions = {}) => (dispatch, getState) => {
  const { moduleName, silent = false, force = false } = signalOptions;
  const currentModuleData = getState()[MODULE_NAME].get(moduleName);
  const method = fetcherOptions.method || 'GET';

  // Если коллекция уже была зарегистрирована, то вернем прошлый ответ
  if (method === 'GET' && currentModuleData !== undefined && !force) {
    return currentModuleData.get('promise');
  }

  const promise = fetcher(url, fetcherOptions).then(({ status, data, error }) => {
    let innerPromise;

    if (error === undefined && status === 200) {
      // Применим обработчик успешных ajax запросов
      innerPromise = co(successHandler(
        dispatch,
        { status, data, url, method, fetcherOptions, signalOptions },
      ));
    } else {
      // Применим ajax запросов с ошибками
      innerPromise = co(errorHandler(
        dispatch,
        { status, data, url, method, fetcherOptions, signalOptions },
      ));

      // В случае ошибки закешированный promise теряет актуальность, произведем разрегистрацию
      if (!silent) {
        dispatch(ajaxControllerUnregisterDelta({ moduleName }));
      }
    }

    return innerPromise;
  });

  // Зарегистрируем модуль
  if (method === 'GET' && !silent) {
    dispatch(ajaxControllerRegisterDelta({ moduleName, promise }));
  }

  // Любые запросы, кроме GET модифицируют коллекцию/модель,
  // А значит закешированный результат теряет актуальность.
  // В связи с этим здесь происходит разрегистрация
  if (method !== 'GET' && !silent) {
    dispatch(ajaxControllerUnregisterDelta({ moduleName }));
  }

  return promise;
};

export const actions = {
  ajaxControllerFetchSignal,
  ajaxControllerUnregisterDelta,
  ajaxControllerMarkAsSavedDelta,
};
