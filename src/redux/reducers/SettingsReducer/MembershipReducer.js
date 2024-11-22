import { types } from '../../types/types';
const intitalState = {
    membershipTypes: [],
    membershipTypesDropdown: [],
    campaigns: [],
    campaignDropdown: [],
    campaignGroups: [],
    compaignGroupDropdown: [],
    allCampaignsTypes: [],
};

const MembershipReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.SETTINGS.MEMBER_SETUP.MEMEBERSHIP_TYPE:
            return {
                ...state,
                membershipTypes: action.payload,
                membershipTypesDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ name: item.name, value: item._id })),
            };
        case types.SETTINGS.MEMBER_SETUP.CAMPAIGN:
            return {
                ...state,
                campaigns: action.payload,
                campaignDropdown: action.payload?.filter((item) => item.isActive)?.map((item) => ({ name: item.name, value: item._id })),
            };
        case types.SETTINGS.MEMBER_SETUP.CAMPAIGN_GROUP:
            return {
                ...state,
                campaignGroups: action.payload,
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

export default MembershipReducer;
