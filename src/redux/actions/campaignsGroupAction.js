import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";
import { showToast } from "./toastAction";

const getCampaignsGroupAction = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.AllCampaignGroups);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ALL_CAMPAIGN_GROUP,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
  };

  const addCampaignGroupAction = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("post", constants.endPoints.AllCampaignGroups,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ADD_CAMPAIGN_GROUP,
                payload: res.data,
            });
        }
        dispatch(hideLoaderAction())
        dispatch(showToast({ severity: "success", summary: res.message }));
    }
    else{
        dispatch(hideLoaderAction())
        dispatch(showToast({ severity: "error", summary: res.message }));
    }
    
    return res;
  };


  const UpdateCampaignGroupAction = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.UpdateCampaignGroups + data._id,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.UPDATE_CAMPAIGN_GROUP,
                payload: res.data,
            });
        }
        dispatch(hideLoaderAction())
        dispatch(showToast({ severity: "success", summary: res.message }));
    }
    else{
        dispatch(hideLoaderAction())
        dispatch(showToast({ severity: "error", summary: res.message }));
    }
    
    return res;
  };


  const DeleteCampaignGroupAction = (id) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.DeleteCampaignGroups + id,{});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.DELETE_CAMPAIGN_GROUP,
                payload: res.data,
            });
        }
        dispatch(hideLoaderAction())
        dispatch(showToast({ severity: "success", summary: res.message }));
    }
    else{
        dispatch(hideLoaderAction())
        dispatch(showToast({ severity: "error", summary: res.message }));
    }
    
    return res;
  };




  export {getCampaignsGroupAction,addCampaignGroupAction,UpdateCampaignGroupAction,DeleteCampaignGroupAction}