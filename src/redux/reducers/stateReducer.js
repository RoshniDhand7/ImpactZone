import { types } from "../types/types";
const intitalState = {
    EventType: [
        {label:"Appointments Only",value:"Appointments Only"},
        {label:"Classes",value:"Classes"},
    ],
    choiceType: [
        {label:"Yes",value:"Yes"},
        {label:"No",value:"No"},
    ],
    NumberchoiceType: [
        {label:"1",value:"1"},
        {label:"2",value:"2"},
    ],
    EventComissionType: [
        {label:"Per Event",value:"Per Event"},
        {label:"Per Person",value:"Per Person"},
    ],
    WaitExpireType: [
        {label:"Event Start",value:"Event Start"},
        {label:"Event End",value:"Event End"},
    ],
    duration: [
        {label:"40 minutes",value:"40 minutes"},
        {label:"45 minutes",value:"45 minutes"},
        {label:"50 minutes",value:"50 minutes"},
        {label:"55 minutes",value:"55 minutes"},
        {label:"60 minutes",value:"60 minutes"},
        {label:"65 minutes",value:"65 minutes"},
    ],
};

const stateReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.EVENT_DURATION:
            return {
                ...state,
                duration: action.payload,
            };
        default:
            return { ...state };
    }
//   return { ...state };
};
export default stateReducer;