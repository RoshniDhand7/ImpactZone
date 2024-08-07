import { types } from '../../types/types';
const intitalState = {
    allDepartments: [],
    departmentsDropdown: [],
};

const departmentReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_DEPARTMENTS:
            return {
                ...state,
                allDepartments: action.payload,
                departmentsDropdown: action.payload?.map((item) => ({ value: item._id, name: item.name })),
            };

        default:
            return { ...state };
    }
};

export default departmentReducer;
