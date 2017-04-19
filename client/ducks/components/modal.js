import { List, Map } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { APPLICATION_NAME } from 'config';

/*
* Constants
* */

const MODULE_NAME = 'modalComponent';

// Action names
const SHOW = `${APPLICATION_NAME}/${MODULE_NAME}/SHOW`;
const CHANGE = `${APPLICATION_NAME}/${MODULE_NAME}/CHANGE`;
const CLOSE_ACTIVE = `${APPLICATION_NAME}/${MODULE_NAME}/CLOSE_ACTIVE`;
const RESET = `${APPLICATION_NAME}/${MODULE_NAME}/RESET`;

/*
* Reducer
* */

const initialState = List();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW:
      return state.push(Map({ id: action.payload.id }));

    case CHANGE:
      return state.pop().push(Map({ id: action.payload.id }));

    case CLOSE_ACTIVE:
      return state.pop();

    case RESET:
      return initialState;

    default:
      return state;
  }
}

/*
* Actions
* */

const modalComponentShowDelta = ({ id }) => ({ type: SHOW, payload: { id } });
const modalComponentChangeDelta = ({ id }) => ({ type: CHANGE, payload: { id } });
const modalComponentCloseActiveDelta = () => ({ type: CLOSE_ACTIVE });
const modalComponentResetDelta = () => ({ type: RESET });

export const actions = {
  modalComponentShowDelta,
  modalComponentChangeDelta,
  modalComponentCloseActiveDelta,
  modalComponentResetDelta,
};

/*
* Shapes
* */

const itemStateShape = ImmutablePropTypes.contains({
  id: PropTypes.string.isRequired,
});

const stateShape = ImmutablePropTypes.listOf(itemStateShape.isRequired);

export const shapes = {
  itemState: itemStateShape,
  state: stateShape,
};
