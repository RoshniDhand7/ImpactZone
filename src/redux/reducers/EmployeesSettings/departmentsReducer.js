import { types } from '../../types/types';
const intitalState = {
    allDepartments: [],
};

const departmentReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_DEPARTMENTS:
            return {
                ...state,
                allDepartments: action.payload,
            };

        default:
            return { ...state };
    }
};

export default departmentReducer;
