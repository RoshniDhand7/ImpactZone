import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";

const getAllRefferalGroup = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.getAllRefferalGroup);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ALL_REFFERAL_GROUP,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
  };

  export {getAllRefferalGroup}