import { types } from "../types/types";

const getStateVAlue = (data) => async (dispatch) => {
    console.log("dattInAction",data)
            dispatch({
                type: types.EVENT_DURATION,
                payload: data,
            });
};

export {getStateVAlue}