import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { showToast } from "./toastAction";

// LOCATION TYPES //
const getLocationTypes = (setLoading) => async (dispatch) => {
    if(setLoading){
        setLoading(true);
    }
    const res = await api("get", constants.endPoints.locationTypes);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.LOCATION_TYPES,
                payload: res.data,
            });
        }
    }
    if(setLoading){
    setLoading(false);
    }
};

const addLocationType = (locationType, setLoading, navigate) => async (dispatch, getState) => {
    setLoading(true);

    const payload = {
        ...locationType
    };

    const res = await api("post", constants.endPoints.locationTypes, payload);
    if (res.success) {
        navigate ? navigate(-1) : dispatch(getLocationTypes(setLoading));
        dispatch(showToast({ severity: "success", summary: res.message }));
    }
    setLoading(false);
};

const updateLocationType = (id, locationType, setLoading, navigate) => async (dispatch, getState) => {
    setLoading(true);

    const payload = {
        ...locationType
    };

    const res = await api("put", constants.endPoints.updateLocationType + id, payload);
    if (res.success) {
        navigate ? navigate(-1) : dispatch(getLocationTypes(setLoading));
        dispatch(showToast({ severity: "success", summary: res.message }));
    }
    setLoading(false);
};

const deleteLocationType = (id, setLoading) => async (dispatch) => {
    const res = await api("put", constants.endPoints.deleteLocationType + id);
    if (res.success) {
        dispatch(showToast({ severity: "success", summary: res.message }));
        dispatch(getLocationTypes(setLoading))
    }
};

// LOCATIONS //
const getLocations = (setLoading, query) => async (dispatch) => {
    setLoading(true);
    const res = await api("get", `${constants.endPoints.locations}${query ? query : ''}`);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.LOCATIONS,
                payload: res.data,
            });
        }
    }
    setLoading(false);
};

const addLocation = (location, setLoading, navigate) => async (dispatch, getState) => {
    setLoading(true);

    const payload = {
        ...location
    };

    const res = await api("post", constants.endPoints.locations, payload);
    if (res.success) {
        navigate ? navigate(-1) : dispatch(getLocations(setLoading));
        dispatch(showToast({ severity: "success", summary: res.message }));
    }
    setLoading(false);
};

const updateLocation = (id, location, setLoading, navigate) => async (dispatch) => {
    setLoading(true);

    const payload = {
        ...location
    };

    const res = await api("put", constants.endPoints.updateLocation + id, payload);
    if (res.success) {
        navigate ? navigate(-1) : dispatch(getLocations(setLoading));
        dispatch(showToast({ severity: "success", summary: res.message }));
    }
    setLoading(false);
};

const deleteLocation = (id, setLoading) => async (dispatch) => {
    const res = await api("put", constants.endPoints.deleteLocation + id);
    if (res.success) {
        dispatch(showToast({ severity: "success", summary: res.message }));
        dispatch(getLocations(setLoading))
    }
};

export { getLocationTypes, addLocationType, updateLocationType, deleteLocationType, getLocations, addLocation, updateLocation, deleteLocation };