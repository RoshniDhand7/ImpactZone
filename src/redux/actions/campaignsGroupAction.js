import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";

const getCampaignsGroupAction = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.AllCampaignGroups);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ALL_RESOURCE_TYPE,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
  };

  export {getCampaignsGroupAction}