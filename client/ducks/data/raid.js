/*
 * Пример модуля данных (модели).
 * */

import co from 'co';
import { Map, fromJS } from 'immutable';
import { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { APPLICATION_NAME } from 'config';
import { fetcher } from 'tools';
// import { delay } from 'tools';

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
const raidDataResetDelta = () => ({ type: RESET });

const raidDataFetchSignal = () => dispatch => co(function* fetchGen() {
  const answer = yield fetcher('/api/raid');
  const { status, data, error } = answer;
  const resultData = {};

  if (error) {
    alert(error); // eslint-disable-line no-alert

    return answer;
  }

  if (status !== 200) {
    alert(`error, status: ${status}`); // eslint-disable-line no-alert
  }

  data.result.forEach((raid) => {
    resultData[raid.id] = raid;
  });

  dispatch(raidDataFetchDoneDelta({ data: resultData }));

  return answer;
});

export const actions = {
  raidDataFetchSignal,
  raidDataResetDelta,
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
