import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";

const getAccessSchedules = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.AccessSchedules);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ACCESS_SCHEDULES,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
};

export { getAccessSchedules }