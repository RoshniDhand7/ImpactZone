import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";
import { showToast } from "./toastAction";

const getEvents = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.allEvents);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.EVENTS,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
};

const addEvents = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("post", constants.endPoints.allEvents,{...data});
    console.log("address",res)
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ADD_EVENT,
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


const UpdateEvents = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.UpdateEvent + data._id,{...data});
    console.log("address",res)
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.UPDATE_EVENT,
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

const DeleteEvents = (id) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.DeleteEvent + id,{});
    console.log("address",res)
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.DELETE_EVENT,
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

export {getEvents,addEvents,UpdateEvents,DeleteEvents}