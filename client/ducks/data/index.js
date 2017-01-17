import { combineReducers } from 'redux';
import raidDataIm from 'ducks/data/raid';

const dataReducer = combineReducers({
  raidDataIm,
});

export default dataReducer;

