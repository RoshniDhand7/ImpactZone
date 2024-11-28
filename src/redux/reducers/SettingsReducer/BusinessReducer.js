import { types } from '../../types/types';
const intitalState = {
    company: [],
    reasonCode: [],
    noSaleReasons: [],
    jobTitle: [],
};

const businessReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.SETTINGS.BUSSINESS.COMPANY:
            return {
                ...state,
                company: action.payload,
            };
        case types.SETTINGS.BUSSINESS.REASON_CODE:
            return {
                ...state,
                reasonCode: action.payload,
            };
        case types.POS.NO_SALE_REASON_CODE:
            return {
                ...state,
                noSaleReasons: action.payload,
            };
        case types.SETTINGS.BUSSINESS.JOB_TITLE:
            return {
                ...state,
                jobTitle: action.payload,
            };
        default:
            return { ...state };
    }
};

export default businessReducer;
