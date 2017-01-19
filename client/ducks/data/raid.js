/*
* Пример модуля данных (модели).
* */

import co from 'co';
import { Map, fromJS } from 'immutable';
import { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { APPLICATION_NAME } from 'config';
import { waitStoreUpdate } from 'tools';
import {
  actions as ajaxControllerActions,
  MODULE_NAME as AJAX_CONTROLLER_MODULE_NAME,
} from 'ducks/ajax-controller/ajax-controller';

const {
  ajaxControllerFetchSignal,
  ajaxControllerUnregisterDelta,
  ajaxControllerMarkAsSavedDelta,
} = ajaxControllerActions;

/*
* Constants
* */

export const MODULE_NAME = 'raidData';
export const URL = '/api/raid';

// Action names
const FETCH_DONE = `${APPLICATION_NAME}/${MODULE_NAME}/FETCH_DONE`;
const DELETE_DONE = `${APPLICATION_NAME}/${MODULE_NAME}/DELETE_DONE`;
const RESET = `${APPLICATION_NAME}/${MODULE_NAME}/RESET`;

/*
* Reducer
* */

const initialState = Map({});

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case FETCH_DONE:
      return fromJS(action.payload);

    case DELETE_DONE:
      return state.delete(action.payload.id);

    case RESET:
      return initialState;

    default:
      return state;
  }
}

/*
* Actions
* */

const raidDataResetSignal = () => (dispatch) => {
  dispatch(ajaxControllerUnregisterDelta({ moduleName: MODULE_NAME }));
  dispatch({ type: RESET });
};

const raidDataGetSignal = () => (dispatch, getState) => co(function* getGen() {
  const answer = yield dispatch(ajaxControllerFetchSignal(
    '/api/raid', {}, { moduleName: MODULE_NAME }),
  );

  const ajaxControllerIm = getState()[AJAX_CONTROLLER_MODULE_NAME];
  const isAlreadySavedInStore = ajaxControllerIm.getIn([MODULE_NAME, 'isAlreadySavedInStore']);

  if (answer.isSuccess && !isAlreadySavedInStore) {
    dispatch({ type: FETCH_DONE, payload: answer.data });
    dispatch(ajaxControllerMarkAsSavedDelta({ moduleName: MODULE_NAME }));
  }

  yield waitStoreUpdate();

  return answer;
});

const raidDataDeleteSignal = ({ id }) => dispatch => co(function* deleteGen() {
  const answer = yield dispatch(ajaxControllerFetchSignal(
    `/api/raid/${id}`, { method: 'DELETE' }, { moduleName: MODULE_NAME }),
  );

  if (answer.isSuccess) {
    dispatch({ type: DELETE_DONE, payload: { id } });
  }

  yield waitStoreUpdate();

  return answer;
});

export const actions = {
  raidDataGetSignal,
  raidDataDeleteSignal,
  raidDataResetSignal,
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
  itemStateShape.isRequired,
  PropTypes.string.isRequired,
);

export const shapes = {
  itemState: itemStateShape,
  state: stateShape,
};
