import { types } from '../../types/types';
const intitalState = {
    allRegisters: [],
};

const RegisterReducer = (state = intitalState, action) => {
    switch (action.type) {
        case types.CHANGE_REGISTERS:
            return {
                ...state,
                allRegisters: action.payload,
            };

        default:
            return { ...state };
    }
};

export default RegisterReducer;
