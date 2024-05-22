import { types } from '../../types/types';
const intitalState = {
    allEmployees: [],
    employeesDropdown: [],
    employeePayType: [],
    allEmployeeClasses: [],
    allAppointmentPay: [],
    allAppointmentPayDropdown: [],
    isClassLevel: '',
    isAppointmentLevel: '',
};

const employeesReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_EMPLOYEES:
            return {
                ...state,
                allEmployees: action.payload,
                employeesDropdown: action.payload.map((item) => ({ name: item.firstName, value: item._id })),
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
                isClassLevel: action.payload.isClassLevel,
            };
        case types.CHANGE_EMPLOYEE_APPOINTMENT_PAY:
            return {
                ...state,
                allAppointmentPay: action.payload,
                allAppointmentPayDropdown: action.payload?.list?.map((item) => ({ name: item.event, value: item._id })),
                isAppointmentLevel: action.payload.isAppointmentLevel,
            };
        default:
            return { ...state };
    }
};

export default employeesReducer;
