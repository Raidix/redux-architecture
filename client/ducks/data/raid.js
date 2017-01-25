import { Map, fromJS } from 'immutable';
import { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { APPLICATION_NAME } from 'config';
import { waitStoreUpdate } from 'tools';
import { fetchSignal } from 'ducks/fetch/fetch';

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

const raidDataResetDelta = () => ({ type: RESET });

const raidDataGetSignal = () => dispatch => Promise.coroutine(function* getGen() {
  const answer = yield dispatch(fetchSignal(URL));

  if (answer.status === 200) {
    dispatch({ type: FETCH_DONE, payload: answer.data });
  }

  yield waitStoreUpdate();

  return answer;
})();

const raidDataDeleteSignal = ({ id }) => dispatch => Promise.coroutine(function* deleteGen() {
  const answer = yield dispatch(fetchSignal(`${URL}/${id}`, { method: 'DELETE' }));

  if (answer.status === 200) {
    dispatch({ type: DELETE_DONE, payload: { id } });
  }

  yield waitStoreUpdate();

  return answer;
})();

export const actions = {
  raidDataGetSignal,
  raidDataDeleteSignal,
  raidDataResetDelta,
};

/*
* Beautify
* */

export const beautify = model => ({
  size() {
    return `${model.get('size')} GiB`;
  },

  drives() {
    return model.get('drives').toJS().join(', ');
  },
});

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
