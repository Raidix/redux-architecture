import { combineReducers } from 'redux';
import raidDataIm from 'ducks/data/raid';
import driveDataIm from 'ducks/data/drive';

const dataReducer = combineReducers({
  raidDataIm,
  driveDataIm,
});

export default dataReducer;

