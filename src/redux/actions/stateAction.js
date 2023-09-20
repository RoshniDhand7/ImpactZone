import { types } from "../types/types";

const getStateVAlue = (data,name) => async (dispatch) => {
    console.log("dattInAction",data,name.toUpperCase())
    let Type = types[`EVENT_`+name.toUpperCase()]
            dispatch({
                type: Type,
                payload: data,
            });
};

export {getStateVAlue}