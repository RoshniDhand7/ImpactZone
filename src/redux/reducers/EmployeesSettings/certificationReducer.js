import { types } from '../../types/types';
const intitalState = {
    allCertificates: [],
};

const certificateReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_MANAGE_EMPLOYEE_CERTIFICATES:
            return {
                ...state,
                allCertificates: action.payload,
            };
        default:
            return { ...state };
    }
};

export default certificateReducer;
