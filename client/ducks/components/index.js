import { combineReducers } from 'redux';
import counterComponentIm from 'ducks/components/counter';
import multipleComponentIm from 'ducks/components/multiple';
import modalComponentIm from 'ducks/components/modal';

const componentsReducer = combineReducers({
  counterComponentIm,
  multipleComponentIm,
  modalComponentIm,
});

export default componentsReducer;

