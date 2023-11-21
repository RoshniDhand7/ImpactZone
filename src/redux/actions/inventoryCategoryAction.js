import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";
import { showToast } from "./toastAction";

const getInventoryCategory = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.getInventoryCategory);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ALL_INVENTORY_CATEGORY,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
  };

  const addInventoryCategory = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("post", constants.endPoints.getInventoryCategory,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ADD_INVENTORY_CATEGORY,
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
  
  
  const UpdateInventoryCategory = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.updateInventoryCategory + data._id,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.UPDATE_INVENTORY_CATEGORY,
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
  
  
  const DeleteInventoryCategory = (id) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.deleteInventoryCategory + id,{});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.DELETE_INVENTORY_CATEGORY,
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

  export {getInventoryCategory,addInventoryCategory,UpdateInventoryCategory,DeleteInventoryCategory}