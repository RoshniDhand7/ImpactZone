import { types } from '../../types/types';
const intitalState = {
    allEmployees: [],
    employeesDropdown: [],
    employeePayType: [],
    allEmployeeClasses: [],
};

const employeesReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_EMPLOYEES:
            return {
                ...state,
                allEmployees: action.payload,
                employeesDropdown: action.payload?.data?.map((item) => ({ name: item.name, value: item._id })),
            };
        case types.CHANGE_EMPLOYEES_PAY_TYPE:
            return {
                ...state,
                employeePayType: action.payload,
            };
        case types.CHANGE_EMPLOYEE_CLASSES:
            return {
                ...state,
                allEmployeeClasses: action.payload,
            };
        default:
            return { ...state };
    }
};

export default employeesReducer;
