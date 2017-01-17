import { Map } from 'immutable';
import { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { APPLICATION_NAME } from 'config';

/*
 * Constants
 * */

const MODULE_NAME = 'multipleComponent';

// Action names
const SET_SELECTED = `${APPLICATION_NAME}/${MODULE_NAME}/SET_SELECTED`;
const REGISTER = `${APPLICATION_NAME}/${MODULE_NAME}/REGISTER`;
const UNREGISTER = `${APPLICATION_NAME}/${MODULE_NAME}/UNREGISTER`;

/*
 * Reducer
 * */

const componentInitialState = Map({
  selectedIndex: 0,
});

const initialState = Map();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER:
      return state.set(action.payload.componentId, componentInitialState);

    case UNREGISTER:
      return state.delete(action.payload.componentId);

    case SET_SELECTED:
      return state.setIn([action.payload.componentId, 'selectedIndex'], action.payload.selectedIndex);

    default:
      return state;
  }
}

/*
 * Actions
 * */

const multipleComponentSetSelectedDelta = ({ componentId, selectedIndex }) => ({
  type: SET_SELECTED,
  payload: { componentId, selectedIndex },
});

const multipleComponentRegisterDelta = ({ componentId }) => ({
  type: REGISTER,
  payload: { componentId },
});

const multipleComponentUnregisterDelta = ({ componentId }) => ({
  type: UNREGISTER,
  payload: { componentId },
});

export const actions = {
  multipleComponentSetSelectedDelta,
  multipleComponentRegisterDelta,
  multipleComponentUnregisterDelta,
};

/*
 * Shapes
 * */

const componentStateShape = ImmutablePropTypes.contains({
  selectedIndex: PropTypes.number.isRequired,
});

const stateShape = ImmutablePropTypes.mapOf(
  componentStateShape.isRequired,
  PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
);

export const shapes = {
  componentState: componentStateShape,
  state: stateShape,
};
