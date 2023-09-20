import { types } from "../types/types";
const intitalState = {
    employees: []
};

const employeesReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.EMPLOYEES:
            return {
                ...state,
                employees: action.payload,
            };
        default:
            return { ...state };
    }
};
export default employeesReducer;