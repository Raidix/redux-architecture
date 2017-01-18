/*
* Пример модуля данных (модели).
* */

import co from 'co';
import { Map, fromJS } from 'immutable';
import { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { APPLICATION_NAME } from 'config';
import { waitStoreUpdate } from 'tools';
import { actions as ajaxControllerActions } from 'ducks/ajax-controller/ajax-controller';

const {
  ajaxControllerFetchSignal,
  ajaxControlleUnregisterDelta,
} = ajaxControllerActions;

/*
* Constants
* */

export const MODULE_NAME = 'raidData';
export const URL = '/api/raid';

// Action names
const FETCH_DONE = `${APPLICATION_NAME}/${MODULE_NAME}/FETCH_DONE`;
const RESET = `${APPLICATION_NAME}/${MODULE_NAME}/RESET`;

/*
* Reducer
* */

const initialState = Map({});

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_DONE:
      return fromJS(action.payload);

    case RESET:
      return initialState;

    default:
      return state;
  }
}

/*
* Actions
* */

const raidDataFetchDoneDelta = ({ data }) => ({ type: FETCH_DONE, payload: data });

const raidDataResetSignal = () => (dispatch) => {
  dispatch(ajaxControlleUnregisterDelta({ moduleName: MODULE_NAME }));
  dispatch({ type: RESET });
};

const raidDataFetchSignal = () => dispatch => co(function* fetchGen() {
  // Получаем коллекцию через контроллер
  const answer = yield dispatch(ajaxControllerFetchSignal('/api/raid', {}, { moduleName: MODULE_NAME }));

  // Сохраняем коллекцию в store
  if (answer.isSuccess) {
    dispatch(raidDataFetchDoneDelta({ data: answer.data }));
  }

  yield waitStoreUpdate();

  return answer;
});

export const actions = {
  raidDataFetchSignal,
  raidDataResetSignal,
  raidDataFetchDoneDelta,
};

/*
* Shapes
* */

const itemStateShape = ImmutablePropTypes.contains({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  drives: ImmutablePropTypes.listOf(PropTypes.number).isRequired,
});

const stateShape = ImmutablePropTypes.mapOf(
  itemStateShape.isRequired,    // value
  PropTypes.string.isRequired,  // key
);

export const shapes = {
  itemState: itemStateShape,
  state: stateShape,
};
