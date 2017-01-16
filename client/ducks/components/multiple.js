import { Map } from 'immutable';
import { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { APPLICATION_NAME } from 'config';

/*
 * Constants
 * */

const MODULE_NAME = 'MULTIPLE_COMPONENT';

// Action names
const SET_SELECTED = `${APPLICATION_NAME}/${MODULE_NAME}/SET_SELECTED`;

/*
 * Reducer
 * */

const initialState = Map({
  selectedIndex: 0,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED:
      return state.set('selectedIndex', action.payload.selectedIndex);

    default:
      return state;
  }
}

/*
 * Actions
 * */

const multipleComponentSetSelectedDelta = ({ selectedIndex }) => ({
  type: SET_SELECTED,
  payload: { selectedIndex },
});

export const actions = {
  multipleComponentSetSelectedDelta,
};

/*
 * Shapes
 * */

const stateShape = ImmutablePropTypes.contains({
  selectedIndex: PropTypes.number.isRequired,
});

export const shapes = {
  state: stateShape,
};
