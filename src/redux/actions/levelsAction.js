import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";

const getLevels = () => async (dispatch) => {
    // setLoading(true);
    const res = await api("get", constants.endPoints.AddLevel);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.LEVELS,
                payload: res.data,
            });
        }
    }
    // setLoading(false);
};

export {getLevels}