import { types } from "../types/types";
const intitalState = {
    AllcampaignsGroup:[],
};

const campaignsGroupReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.ALL_CAMPAIGN_GROUP:
            return {
                ...state,
                AllcampaignsGroup: action.payload,
            }
        default:
            return { ...state };
    }
};
export default campaignsGroupReducer;