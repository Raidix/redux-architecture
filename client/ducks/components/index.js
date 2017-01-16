import { combineReducers } from 'redux';
import counter from 'ducks/components/counter';

const componentsReducer = combineReducers({
  counter,
});

export default componentsReducer;

