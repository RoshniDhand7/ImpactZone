import { combineReducers } from "redux";
import loaderReducer from "./loaderReducer";
import toastReducer from "./toastReducer";
import locationsReducer from "./locationsReducer";
import clubsReducer from "./clubsReducer";
import eventsReducer from "./eventsReducer";
import employeesReducer from "./employeesReducer";
import classSchedulesReducer from "./classSchedulesReducer";

export default combineReducers({
  loader: loaderReducer,
  toast: toastReducer,
  locations: locationsReducer,
  clubs: clubsReducer,
  events: eventsReducer,
  employees: employeesReducer,
  classSchedules: classSchedulesReducer
});
