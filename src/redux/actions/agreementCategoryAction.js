import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";
import { showToast } from "./toastAction";

const getAgreementCategory = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.getAllAgreementCategory);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ALL_AGREEMENTCATEGORY,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
};

const addAgreementCategoryAction = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("post", constants.endPoints.addAgreementCategory,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ADD_AGREEMENTCATEGORY,
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

  const UpdateAgreementCategory = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.updateAgreementCategory + data._id,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.UPDATE_AGREEMENTCATEGORY,
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

  const DeleteAgreementCategory = (id) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.deleteAgreementCategory + id,{});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.DELETE_AGREEMENTCATEGORY,
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

export {getAgreementCategory,addAgreementCategoryAction,UpdateAgreementCategory,DeleteAgreementCategory}