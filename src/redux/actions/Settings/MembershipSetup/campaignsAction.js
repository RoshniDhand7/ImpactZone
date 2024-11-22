import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { hideTableLoaderAction, showTableLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getCampaigns = () => async (dispatch, getState) => {
    const state = getState();
    let campaigns = state.settings.members.campaigns;
    if (!campaigns?.length) {
        dispatch(showTableLoaderAction());
    }
    const res = await api('get', EndPoints.SETTINGS.MEMBER_SETUP.CAMPAIGN);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.MEMBER_SETUP.CAMPAIGN,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideTableLoaderAction());
};

const getCampaign = (id, returnData) => async (dispatch) => {
    const res = await api('get', EndPoints.SETTINGS.MEMBER_SETUP.CAMPAIGN + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
};

const addCampaign = (data, history) => async (dispatch) => {
    dispatch(showTableLoaderAction());

    const res = await api('post', EndPoints.SETTINGS.MEMBER_SETUP.CAMPAIGN, data);
    if (res.success) {
        history.goBack();
    }
    dispatch(hideTableLoaderAction());
};
const editCampaign = (id, data, history) => async (dispatch, getState) => {
    dispatch(showTableLoaderAction());
    const res = await api('put', EndPoints.SETTINGS.MEMBER_SETUP.CAMPAIGN + id, data);
    if (res.success) {
        history.goBack();
    }
    dispatch(hideTableLoaderAction());
};
const deleteCampaign = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SETTINGS.MEMBER_SETUP.CAMPAIGN + id);
    if (res.success) {
        dispatch(getCampaigns(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getCampaigns, addCampaign, getCampaign, editCampaign, deleteCampaign };
