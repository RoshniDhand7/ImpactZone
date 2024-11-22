import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { hideLoaderAction, hideTableLoaderAction, showLoaderAction, showTableLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getCampaignGroups = () => async (dispatch, getState) => {
    const state = getState();
    let campaignGroups = state.settings.members.campaignGroups;
    if (!campaignGroups?.length) {
        dispatch(showTableLoaderAction());
    }
    const res = await api('get', EndPoints.SETTINGS.MEMBER_SETUP.CAMPAIGN_GROUP);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.MEMBER_SETUP.CAMPAIGN_GROUP,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideTableLoaderAction());
};
const getCampaignTypes = () => async (dispatch) => {
    const res = await api('get', EndPoints.SETTINGS.MEMBER_SETUP.CAMPAIGN_GROUP);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_CAMPAIGN_TYPES,
                payload: res.data,
            });
        }
    }
};

const getCampaignsGroup = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.SETTINGS.MEMBER_SETUP.CAMPAIGN_GROUP + id);
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

    const res = await api('post', EndPoints.SETTINGS.MEMBER_SETUP.CAMPAIGN_GROUP, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editCampaignGroup = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.SETTINGS.MEMBER_SETUP.CAMPAIGN_GROUP + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteCampaignGroup = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SETTINGS.MEMBER_SETUP.CAMPAIGN_GROUP + id);
    if (res.success) {
        dispatch(getCampaignGroups(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getCampaignGroups, addCampaignGroup, getCampaignsGroup, editCampaignGroup, deleteCampaignGroup, getCampaignTypes };
