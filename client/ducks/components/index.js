import { combineReducers } from 'redux';
import counterComponentIm from 'ducks/components/counter';
import multipleComponentIm from 'ducks/components/multiple';

const componentsReducer = combineReducers({
  counterComponentIm,
  multipleComponentIm,
});

export default componentsReducer;

