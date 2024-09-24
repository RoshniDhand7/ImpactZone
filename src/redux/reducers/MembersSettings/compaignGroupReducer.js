import { types } from '../../types/types';
const intitalState = {
    allCompaignGroups: [],
    compaignGroupDropdown: [],
    allCampaignsTypes: [],
};

const comapignGroupReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_COMPAIGNS_GROUP:
            return {
                ...state,
                allCompaignGroups: action.payload,
                compaignGroupDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ name: item.name, value: item._id })),
            };
        case types.CHANGE_CAMPAIGN_TYPES:
            return {
                ...state,
                allCampaignsTypes: action.payload?.map((item) => ({ name: item.name, value: item._id })),
            };

        default:
            return { ...state };
    }
};

export default comapignGroupReducer;
