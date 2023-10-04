import { combineReducers } from "redux";
import loaderReducer from "./loaderReducer";
import toastReducer from "./toastReducer";
import locationsReducer from "./locationsReducer";
import clubsReducer from "./clubsReducer";
import eventsReducer from "./eventsReducer";
import stateReducer from "./stateReducer";
import levelReducer from "./levelsReducer";
import employeesReducer from "./employeesReducer";
import classSchedulesReducer from "./classSchedulesReducer";
import resourceTypeReducer from "./resourceTypeReducer";
import resourceReducer from "./resourceReducer";

export default combineReducers({
  loader: loaderReducer,
  toast: toastReducer,
  locations: locationsReducer,
  clubs: clubsReducer,
  events: eventsReducer,
  staticData: stateReducer,
  levelData: levelReducer,
  employees: employeesReducer,
  classSchedules: classSchedulesReducer,
  resourceType: resourceTypeReducer,
  resources: resourceReducer,
});
