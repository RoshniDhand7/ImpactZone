import { types } from '../../types/types';
const intitalState = {
    company: [],
    reasonCode: [],

    jobTitle: [],
    clubs: [],
    clubsDropdown: [],
};

const businessReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.SETTINGS.BUSINESS.COMPANY:
            return {
                ...state,
                company: action.payload,
            };
        case types.SETTINGS.BUSINESS.REASON_CODE:
            return {
                ...state,
                reasonCode: action.payload,
            };
        case types.SETTINGS.BUSINESS.JOB_TITLE:
            return {
                ...state,
                jobTitle: action.payload,
            };
        case types.SETTINGS.BUSINESS.CLUBS:
            return {
                ...state,
                clubs: action.payload,
                clubsDropdown: action.payload?.map((item) => ({ name: item.name, value: item._id })),
            };
        default:
            return { ...state };
    }
};

export default businessReducer;
