import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";

const getAllCommissionGroup = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.allCommissionGroup);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ALL_COMMISSION_GROUP,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
  };

  export {getAllCommissionGroup}