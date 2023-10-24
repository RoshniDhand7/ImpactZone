import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";
import { showToast } from "./toastAction";

const getMembershipPlans = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.getMembershipPlans);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.MEMBERSHIP_PLANS,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
};

export { getMembershipPlans };
