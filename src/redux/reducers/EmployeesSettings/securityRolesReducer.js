import { types } from '../../types/types';
const intitalState = {
    allPermissions: [],
    allSecurityRoles: [],
};

const securityRolesReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_PERMISSIONS:
            return {
                ...state,
                allPermissions: action.payload,
            };

        case types.CHANGE_SECURITY_ROLES:
            return {
                ...state,
                allSecurityRoles: action.payload,
            };
        default:
            return { ...state };
    }
};

export default securityRolesReducer;
