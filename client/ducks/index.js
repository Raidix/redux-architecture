/*
* Root reducer
* */

import { combineReducers } from 'redux';
import componentsReducer from 'ducks/components';
import dataReducer from 'ducks/data';
import ajaxControllerReducer from 'ducks/ajax-controller/ajax-controller';

const rootReducer = combineReducers({
  components: componentsReducer,
  data: dataReducer,
  ajaxController: ajaxControllerReducer,
});

export default rootReducer;

