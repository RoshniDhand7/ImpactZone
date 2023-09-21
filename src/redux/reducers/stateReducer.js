import { types } from "../types/types";
const intitalState = {
  EventType: [
    { label: "Appointments Only", value: "Appointments Only" },
    { label: "Classes", value: "Classes" },
  ],
  choiceType: [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ],
  NumberchoiceType: [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
  ],
  EventComissionType: [
    { label: "Per Event", value: "Per Event" },
    { label: "Per Person", value: "Per Person" },
  ],
  WaitExpireType: [
    { label: "Event Start", value: "Event Start" },
    { label: "Event End", value: "Event End" },
  ],
  duration: [40,45,50,55,60,65,],
  calendarDisplay: ["Member Name","Event","Status","Employee Name","Enrolled/Max Attendee","Duration","Level","Location"],
  popupDisplay: ["Member Name","Event","Status","Employee Name","Enrolled/Max Attendee"],
  rebookingTimeOption: [
    { label: "Hour", value: "Hour" },
    { label: "Half Hour", value: "Half Hour" },
    { label: "Quarter Hour", value: "Quarter Hour" },
  ],
  deployedClubs: ["Member Name","Event","Status","Enrolled/Max Attendee"],
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
