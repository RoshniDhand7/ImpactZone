import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";
import { showToast } from "./toastAction";

const getAllCommissionGroup = (params) => async (dispatch) => {
    console.log("paramsinaction",params)
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.allCommissionGroup,{},params);
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

  const addCommissionGroup = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("post", constants.endPoints.allCommissionGroup,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ADD_COMMISSION_GROUP,
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

  const UpdateCommissionGroup = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.updateCommissionGroup + data._id,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.UPDATE_COMMISION_GROUP,
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

  const DeleteCommissionGroup = (id) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.deleteCommissionGroup + id,{});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.DELETE_COMMISSION_GROUP,
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

  export {getAllCommissionGroup,addCommissionGroup,UpdateCommissionGroup,DeleteCommissionGroup}