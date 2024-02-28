import { types } from '../../types/types';
const intitalState = {
    allEmployees: [],
    employeesDropdown: [],
};

const employeesReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_EMPLOYEES:
            return {
                ...state,
                allEmployees: action.payload,
                employeesDropdown: action.payload?.data?.map((item) => ({ name: item.name, value: item._id })),
            };
        default:
            return { ...state };
    }
};

export default employeesReducer;
