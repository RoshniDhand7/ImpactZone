import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getCampaignsGroups = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.COMPAIGNS_GROUP);
    console.log(res)
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_COMPAIGNS_GROUP,
                payload: res.data,
            });
        }
    }
    else {
        dispatch(showToast({ severity: 'error', summary: res.message??res }));
    }
    if (setLoading) {
        setLoading(false);
    }
};

const getCampaignsGroup = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.COMPAIGNS_GROUP + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addCampaignGroup = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.COMPAIGNS_GROUP, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editCampaignGroup = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.COMPAIGNS_GROUP + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteCampaignGroup = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.COMPAIGNS_GROUP + id);
    if (res.success) {
        dispatch(getCampaignsGroups(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getCampaignsGroups, addCampaignGroup, getCampaignsGroup, editCampaignGroup, deleteCampaignGroup };
