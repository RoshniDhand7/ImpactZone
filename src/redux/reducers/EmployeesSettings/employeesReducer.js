import { types } from '../../types/types';
const intitalState = {
    allEmployees: [],
};

const employeesReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_EMPLOYEES:
            return {
                ...state,
                allEmployees: action.payload,
            };
        default:
            return { ...state };
    }
};

export default employeesReducer;
