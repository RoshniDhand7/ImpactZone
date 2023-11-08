import api from "../../services/api";
import constants from "../../utils/constants";
import { types } from "../types/types";
import { hideLoaderAction, showLoaderAction } from "./loaderAction";
import { showToast } from "./toastAction";

const getMembershipPlans = () => async (dispatch) => {
    dispatch(showLoaderAction())
    const res = await api("get", constants.endPoints.getMembershipPlans);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.MEMBERSHIP_PLANS,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction())
};

const addMemberShipPlan = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("post", constants.endPoints.getMembershipPlans,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.ADDMEMBERSHIP_PLANS,
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

  const UpdateMemberShipPlan = (data) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.updateMembershipPlan + data._id,{...data});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.UPDATE_MEMBERSHIP_PLANS,
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

  const DeleteMemberShipPlan = (id) => async (dispatch,setLoading) => {
    dispatch(showLoaderAction())
    const res = await api("put", constants.endPoints.deleteMembershipPlan + id,{});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.DELETE_MEMBERSHIP_PLANS,
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

export { getMembershipPlans,addMemberShipPlan,UpdateMemberShipPlan,DeleteMemberShipPlan };
