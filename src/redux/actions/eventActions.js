import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";

const getEvents = () => async (dispatch) => {
    // setLoading(true);
    const res = await api("get", constants.endPoints.allEvents);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.EVENTS,
                payload: res.data,
            });
        }
    }
    // setLoading(false);
};

export {getEvents}