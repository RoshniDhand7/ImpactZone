import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";
import { showToast } from "./toastAction";

const getVendor = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.getAllVendor);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ALL_VENDOR,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
  };

  const addVendor = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("post", constants.endPoints.getAllVendor,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ADD_VENDOR,
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

  const UpdateVendor = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.updateVendor + data._id,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.UPDATE_VENDOR,
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


  const DeleteVendor = (id) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.deleteVendor + id,{});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.DELETE_VENDOR,
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

  export {getVendor,addVendor,UpdateVendor,DeleteVendor}