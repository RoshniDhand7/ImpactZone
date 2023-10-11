import { types } from "../types/types";

const getStateVAlue = (data, name) => async (dispatch) => {
    let Type = types[`EVENT_` + name.toUpperCase()]
    dispatch({
        type: Type,
        payload: data,
    });
};

export { getStateVAlue }