import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";
import { showToast } from "./toastAction";

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

  const addMemberShipType = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("post", constants.endPoints.MemberShipType,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ADD_MEMBERSHIP_TYPE,
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

  const UpdateMemberShipTypeAction = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.UpdateMemberShipType + data._id,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.UPDATE_MEMBERSHIP_TYPE,
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

  const DeleteMemberShipTypeAction = (id) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.DeleteMemberShipType + id,{});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.DELETE_MEMBERSHIP_TYPE,
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

  export {getMemberShipType,addMemberShipType,UpdateMemberShipTypeAction,DeleteMemberShipTypeAction}