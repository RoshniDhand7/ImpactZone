import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { showToast } from "./toastAction";

const getEventsByType = (setLoading, type) => async (dispatch) => {
    setLoading(true);
    const res = await api("get", `${constants.endPoints.getEventsByType}?type=${type}`);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.EVENTS_BY_TYPE,
                payload: res.data,
            });
        }
    }
    setLoading(false);
};

export { getEventsByType };