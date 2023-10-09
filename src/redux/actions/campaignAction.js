import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";


const getCampaignsAction = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.AllCampaign);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ALL_CAMPAIGN,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
  };

  export{getCampaignsAction}