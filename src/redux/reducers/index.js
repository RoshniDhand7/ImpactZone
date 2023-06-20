import { combineReducers } from "redux";
import loaderReducer from "./loaderReducer";
import toastReducer from "./toastReducer";

export default combineReducers({
  loader: loaderReducer,
  toast: toastReducer,
});
