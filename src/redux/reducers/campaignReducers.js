import { types } from "../types/types";
const intitalState = {
    Allcampaigns:[],
};

const campaignsReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.ALL_CAMPAIGN:
            return {
                ...state,
                Allcampaigns: action.payload,
            }
        default:
            return { ...state };
    }
};
export default campaignsReducer;