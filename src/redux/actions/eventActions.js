import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";

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
    }
    dispatch(hideLoaderAction())
};

export {getEvents,addEvents}