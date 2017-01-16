import co from 'co';
import { Map } from 'immutable';
import { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { APPLICATION_NAME } from 'config';
import { delay } from 'tools';

/*
* Constants
* */

const MODULE_NAME = 'COUNTER_COMPONENT';

// Action names
const INCREASE = `${APPLICATION_NAME}/${MODULE_NAME}/INCREASE`;
const DECREASE = `${APPLICATION_NAME}/${MODULE_NAME}/DECREASE`;

/*
* Reducer
* */

const initialState = Map({
  value: 0,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state.set('value', state.get('value') + 1);

    case DECREASE:
      return state.set('value', state.get('value') - 1);

    default:
      return state;
  }
}

/*
* Actions
* */

const counterComponentIncreaseDelta = () => ({ type: INCREASE });
const counterComponentDecreaseDelta = () => ({ type: DECREASE });

const counterComponentIncreaseAsyncSignal = () => dispatch => co(function* increaseAsync() {
  yield delay(1000);

  dispatch(counterComponentIncreaseDelta());
});

export const actions = {
  counterComponentIncreaseDelta,
  counterComponentDecreaseDelta,
  counterComponentIncreaseAsyncSignal,
};

/*
* Shapes
* */

const stateShape = ImmutablePropTypes.contains({
  value: PropTypes.number.isRequired,
});

export const shapes = {
  state: stateShape,
};