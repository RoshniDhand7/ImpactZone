import { types } from "../types/types";
const intitalState = {
  EventType: [
    { label: "Appointments Only", value: "Appointments Only" },
    { label: "Classes", value: "Classes" },
  ],
  choiceType: [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ],
  NumberchoiceType: [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
    { label: "16", value: "16" },
    { label: "17", value: "17" },
    { label: "18", value: "18" },
    { label: "19", value: "19" },
    { label: "20", value: "20" },
    { label: "21", value: "21" },
    { label: "22", value: "22" },
    { label: "23", value: "23" },
    { label: "24", value: "24" },
    { label: "25", value: "25" },
    { label: "26", value: "26" },
    { label: "27", value: "27" },
    { label: "28", value: "28" },
    { label: "29", value: "29" },
    { label: "30", value: "30" },
  ],
  EventComissionType: [
    { label: "Per Event", value: "Per Event" },
    { label: "Per Person", value: "Per Person" },
  ],
  WaitExpireType: [
    { label: "Event Start", value: "Event Start" },
    { label: "Event End", value: "Event End" },
  ],
  duration: [40, 45, 50, 55, 60, 65,],
  calendarDisplay: ["Member Name", "Event", "Status", "Employee Name", "Enrolled / Max Attendee", "Duration", "Level", "Location"],
  popupDisplay: ["Member Name", "Event", "Status", "Employee Name", "Enrolled / Max Attendee", "Duration", "Level", "Location"],
  rebookingTimeOption: [
    { label: "Hour", value: "Hour" },
    { label: "Half Hour", value: "Half Hour" },
    { label: "Quarter Hour", value: "Quarter Hour" },
  ],
  deployedClubs: ["Member Name", "Event", "Status", "Employee Name", "Enrolled / Max Attendee", "Duration", "Level", "Location"],
};

const stateReducer = (state = intitalState, action) => {
  switch (action.type) {
    case types.EVENT_DURATIONS:
      return {
        ...state,
        duration: action.payload,
      };
    case types.EVENT_CALENDARDISPLAY:
      return {
        ...state,
        calendarDisplay: action.payload,
      };
    case types.EVENT_POPUPDISPLAY:
      return {
        ...state,
        popupDisplay: action.payload,
      };
    case types.EVENT_DEPLOYEDCLUBS:
      return {
        ...state,
        deployedClubs: action.payload,
      };

    default:
      return { ...state };
  }
  //   return { ...state };
};
export default stateReducer;