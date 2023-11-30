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
import memberShipTypeReducer from "./memberShipTypesReducer";
import campaignsGroupReducer from "./campaignsGroupReducers";
import campaignsReducer from "./campaignReducers";
import assessedReducer from "./assessedReducers";
import agreementCategoryReducer from "./agreementReducers";
import accessSchedulesReducer from "./accessSchedulesReducer";
import agreementPromotionsReducer from "./agreementPromotionsReducer";
import membershipPlansReducer from "./membershipPlansReducer";
import ProfitCenterReducer from "./profitCenterReducer";
import InventoryCategoryReducer from "./inventoryCategoryReducer";
import VendorReducer from "./VendorReducer";
import RefferalGroupReducer from "./RefferalGroupReducer";

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
  memberShip: memberShipTypeReducer,
  campaignsGroup: campaignsGroupReducer,
  campaign: campaignsReducer,
  Assessed: assessedReducer,
  AgreementCategory: agreementCategoryReducer,
  accessSchedules: accessSchedulesReducer,
  agreementPromotions: agreementPromotionsReducer,
  membershipPlans: membershipPlansReducer,
  profitCenter: ProfitCenterReducer,
  InventoryCategory: InventoryCategoryReducer,
  VendorReducer: VendorReducer,
  RefferalGroupReducer: RefferalGroupReducer,
});
