import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { showToast } from "./toastAction";

const getClubs = (setLoading) => async (dispatch) => {
    setLoading(true);
    const res = await api("get", constants.endPoints.GetClubs);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CLUBS,
                payload: res.data,
            });
        }
    }
    setLoading(false);
};

export { getClubs };