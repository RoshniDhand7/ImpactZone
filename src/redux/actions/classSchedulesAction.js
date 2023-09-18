import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { showToast } from "./toastAction";

const getClassSchedules = (setLoading) => async (dispatch) => {
    setLoading(true);
    const res = await api("get", constants.endPoints.classSchedules);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CLASS_SCHEDULES,
                payload: res.data,
            });
        }
    }
    setLoading(false);
};

const addClassSchedule = (schedule, setLoading, navigate) => async (dispatch, getState) => {
    setLoading(true);

    const payload = {
        ...schedule
    };

    const res = await api("post", constants.endPoints.classSchedules, payload);
    if (res.success) {
        navigate ? navigate(-1) : dispatch(getClassSchedules(setLoading));
        dispatch(showToast({ severity: "success", summary: res.message }));
    }
    setLoading(false);
};

const updateClassSchedule = (id, schedule, setLoading, navigate) => async (dispatch) => {
    setLoading(true);

    const payload = {
        ...schedule
    };

    const res = await api("put", constants.endPoints.updateClassSchedules + id, payload);
    if (res.success) {
        navigate ? navigate(-1) : dispatch(getClassSchedules(setLoading));
        dispatch(showToast({ severity: "success", summary: res.message }));
    }
    setLoading(false);
};

const deleteClassSchedule = (id, setLoading) => async (dispatch) => {
    const res = await api("put", constants.endPoints.deleteClassSchedule + id);
    if (res.success) {
        dispatch(showToast({ severity: "success", summary: res.message }));
        dispatch(getClassSchedules(setLoading))
    }
};

export { getClassSchedules, addClassSchedule, updateClassSchedule, deleteClassSchedule };