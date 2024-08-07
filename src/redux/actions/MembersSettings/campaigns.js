import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getCampaigns = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.COMPAIGN);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_COMPAIGNS,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    if (setLoading) {
        setLoading(false);
    }
};

const getCampaign = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.COMPAIGN + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addCampaign = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.COMPAIGN, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editCampaign = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.COMPAIGN + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteCampaign = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.COMPAIGN + id);
    if (res.success) {
        dispatch(getCampaigns(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getCampaigns, addCampaign, getCampaign, editCampaign, deleteCampaign };
