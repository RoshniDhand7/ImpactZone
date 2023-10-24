import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";
import { showToast } from "./toastAction";

const getAgreementPromotions = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.getAllAgreementPromotions);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ALL_AGREEMENT_PROMOTIONS,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
};

const addAgreementPromotionsAction = (data) => async (dispatch, setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("post", constants.endPoints.addAgreementPromotions, { ...data });
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ADD_AGREEMENT_PROMOTIONS,
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

const updateAgreementPromotions = (data) => async (dispatch, setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.updateAgreementPromotions + data._id, { ...data });
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.UPDATE_AGREEMENT_PROMOTIONS,
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

const deleteAgreementPromotions = (id) => async (dispatch, setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.deleteAgreementPromotions + id, {});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.DELETE_AGREEMENT_PROMOTIONS,
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

export { getAgreementPromotions, addAgreementPromotionsAction, updateAgreementPromotions, deleteAgreementPromotions }