import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { showToast } from "./toastAction";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";

const getResourceType = () => async (dispatch) => {
  dispatch(showLoaderAction())
  const res = await api("get", constants.endPoints.resourceType);
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

const addResourceType = (data) => async (dispatch,setLoading) => {
  dispatch(showLoaderAction())
  const res = await api("post", constants.endPoints.resourceType,{...data});
  if (res.success) {
      if (res.data) {
          dispatch({
              type: types.ADD_RESOURCETYPE,
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


const UpdateResourceType = (data) => async (dispatch,setLoading) => {
  dispatch(showLoaderAction())
  const res = await api("put", constants.endPoints.UpdateResourceType + data._id,{...data});
  if (res.success) {
      if (res.data) {
          dispatch({
              type: types.UPDATE_RESOURCE_TYPE,
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


const DeleteResourceType = (id) => async (dispatch,setLoading) => {
  dispatch(showLoaderAction())
  const res = await api("put", constants.endPoints.DeleteResourceType + id,{});
  if (res.success) {
      if (res.data) {
          dispatch({
              type: types.DELETE_RESOURCE_TYPE,
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

export {addResourceType,getResourceType,DeleteResourceType,UpdateResourceType}