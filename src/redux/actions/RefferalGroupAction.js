import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";
import { showToast } from "./toastAction";

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

  const addRefferalGroup = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("post", constants.endPoints.getAllRefferalGroup,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ADD_REFFERAL_GROUP,
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

  const UpdateRefferalGroup = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.updateRefferalGroup + data._id,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.UPDATE_REFFERAL_GROUP,
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

  const DeleteRefferalGroup = (id) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.deleteRefferalGroup + id,{});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.DELETE_REFFERAL_GROUP,
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

  export {getAllRefferalGroup,addRefferalGroup,UpdateRefferalGroup,DeleteRefferalGroup}