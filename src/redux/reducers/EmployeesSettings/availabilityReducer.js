import { types } from '../../types/types';
const intitalState = {
    employeeClubs: [],
    availability: {},
};

const availabilityReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_EMPLOYEE_CLUBS:
            return {
                ...state,
                employeeClubs: action.payload?.map((item) => ({ name: item.name, value: item._id })),
                availability: action?.payload?.map((item) => (item.availability ? item.availability : {})),
            };
        default:
            return { ...state };
    }
};

export default availabilityReducer;