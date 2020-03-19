import { combineReducers } from 'redux';
import session from './session';
import drawer from './drawer';

const rootReducer = combineReducers({
  session,
  drawer,
});

export default rootReducer;
