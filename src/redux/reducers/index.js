import { combineReducers } from "redux";
import loaderReducer from "./loaderReducer";
import toastReducer from "./toastReducer";
import locationsReducer from "./locationsReducer";
import clubsReducer from "./clubsReducer";
import eventsReducer from "./eventsReducer";

export default combineReducers({
  loader: loaderReducer,
  toast: toastReducer,
  locations: locationsReducer,
  clubs: clubsReducer,
  events: eventsReducer
});
