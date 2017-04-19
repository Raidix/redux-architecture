import { Map, fromJS } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { APPLICATION_NAME } from 'config';
import { fetchSignal } from 'ducks/fetch';

/*
* Constants
* */

export const MODULE_NAME = 'driveData';
export const URL = '/api/drive';

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

const driveDataResetDelta = () => ({ type: RESET });

const driveDataGetSignal = () => dispatch => Promise.coroutine(function* getGen() {
  const answer = yield dispatch(fetchSignal(URL));

  if (answer.isSuccess) {
    dispatch({ type: FETCH_DONE, payload: answer.data });
  }

  return answer;
})();

export const actions = {
  driveDataResetDelta,
  driveDataGetSignal,
};

/*
* Shapes
* */

const itemStateShape = ImmutablePropTypes.contains({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

const stateShape = ImmutablePropTypes.mapOf(
  itemStateShape.isRequired,
  PropTypes.string.isRequired,
);

export const shapes = {
  itemState: itemStateShape,
  state: stateShape,
};
