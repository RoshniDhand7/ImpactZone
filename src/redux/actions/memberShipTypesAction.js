import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";

const getMemberShipType = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.MemberShipType);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ALL_MEMBERSHIP_TYPE,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
  };

  export {getMemberShipType}