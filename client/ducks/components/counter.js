/*
* Пример модуля умного компонента.
* */

import { Map } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { APPLICATION_NAME } from 'config';
import delay from 'tools/delay';

/*
* Constants
* */

const MODULE_NAME = 'counterComponent';

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

const counterComponentIncreaseAsyncSignal = () => dispatch => Promise.coroutine(function* increaseAsync() {
  yield delay(500);

  dispatch(counterComponentIncreaseDelta());
})();

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
