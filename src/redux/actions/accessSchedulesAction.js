import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";
import { showToast } from "./toastAction";

const getAccessSchedules = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.AccessSchedules);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ACCESS_SCHEDULES,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
};

const addAccessSchedule = (data) => async (dispatch, setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("post", constants.endPoints.AccessSchedules, { ...data });
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ADD_ACCESSS_SCHEDULE,
                payload: res.data,
            });
        }
        dispatch(hideLoaderAction())
        dispatch(showToast({ severity: "success", summary: res.message }));
    }
    else {
        dispatch(hideLoaderAction())
        dispatch(showToast({ severity: "error", summary: res.message }));
    }
    return res;
};

const updateAccessSchedule = (data) => async (dispatch, setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.UpdateAccessSchedule + data._id, { ...data });
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.UPDATE_ACCESSS_SCHEDULE,
                payload: res.data,
            });
        }
        dispatch(hideLoaderAction())
        dispatch(showToast({ severity: "success", summary: res.message }));
    }
    else {
        dispatch(hideLoaderAction())
        dispatch(showToast({ severity: "error", summary: res.message }));
    }

    return res;
};

const deleteAccessSchedul = (id) => async (dispatch, setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.DeleteAccessSchedule + id, {});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.DELETE_ACCESSS_SCHEDULE,
                payload: res.data,
            });
        }
        dispatch(hideLoaderAction())
        dispatch(showToast({ severity: "success", summary: res.message }));
    }
    else {
        dispatch(hideLoaderAction())
        dispatch(showToast({ severity: "error", summary: res.message }));
    }

    return res;
};

export { getAccessSchedules, addAccessSchedule, updateAccessSchedule, deleteAccessSchedul }