import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';
import toastReducer from './toastReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  loader: loaderReducer,
  toast: toastReducer,
  profile: profileReducer,
});
