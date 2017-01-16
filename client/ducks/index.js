/*
* Root reducer
* */

import { combineReducers } from 'redux';
import componentsReducer from 'ducks/components';
// import dataReducer from 'ducks/data';

const rootReducer = combineReducers({
  components: componentsReducer,
  // data: dataReducer,
});

export default rootReducer;

