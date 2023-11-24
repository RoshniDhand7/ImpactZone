import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";
import { showToast } from "./toastAction";

const getProfitCenter = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.getProfitCenter);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ALL_PROFIT_CENTER,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
  };

  const addProfitCenter = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("post", constants.endPoints.getProfitCenter,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ADD_PROFIT_CENTER,
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
  
  
  const UpdateProfitCenter = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.updateProfitCenter + data._id,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.UPDATE_PROFIT_CENTER,
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
  
  
  const DeleteProfitCenter = (id) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.deleteProfitCenter + id,{});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.DELETE_PROFIT_CENTER,
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

  export {getProfitCenter,addProfitCenter,UpdateProfitCenter,DeleteProfitCenter}