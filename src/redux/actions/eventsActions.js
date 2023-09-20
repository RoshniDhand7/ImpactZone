import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { showToast } from "./toastAction";

const getEventsByType = (setLoading, type) => async (dispatch) => {
    setLoading(true);
    const res = await api("get", `${constants.endPoints.getEventsByType}?type=${type}`);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.EVENTS_BY_TYPE,
                payload: res.data,
            });
        }
    }
    setLoading(false);
};

const getEventCategories = (setLoading, type) => async (dispatch) => {
    setLoading(true);
    const res = await api("get", `${constants.endPoints.getEventCategories}`);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.EVENT_CATEGORIES,
                payload: res.data,
            });
        }
    }
    setLoading(false);
};

const addEventCategory = (eventCategory, setLoading, navigate) => async (dispatch, getState) => {
    setLoading(true);

    const payload = {
        ...eventCategory
    };

    const res = await api("post", constants.endPoints.addEventCategory, payload);
    if (res.success) {
        navigate ? navigate(-1) : dispatch(getEventCategories(setLoading));
        dispatch(showToast({ severity: "success", summary: res.message }));
    }
    setLoading(false);
};

const updateEventCategory = (id, eventCategory, setLoading, navigate) => async (dispatch, getState) => {
    setLoading(true);

    const payload = {
        ...eventCategory
    };

    const res = await api("put", constants.endPoints.updatEventCategory + id, payload);
    if (res.success) {
        navigate ? navigate(-1) : dispatch(getEventCategories(setLoading));
        dispatch(showToast({ severity: "success", summary: res.message }));
    }
    setLoading(false);
};

const deleteEventCategory = (id, setLoading) => async (dispatch) => {
    const res = await api("put", constants.endPoints.deleteEventCategory + id);
    if (res.success) {
        dispatch(showToast({ severity: "success", summary: res.message }));
        dispatch(getEventCategories(setLoading))
    }
};

export { getEventsByType, getEventCategories, addEventCategory, updateEventCategory, deleteEventCategory };