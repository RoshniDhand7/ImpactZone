import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getCommissionGroups = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.COMMISSION_GROUPS);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_COMMISSION_GROUPS,
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

const getCommissionGroup = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.COMMISSION_GROUPS + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addCommissionGroups = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.COMMISSION_GROUPS, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editCommissionGroups = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.COMMISSION_GROUPS + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteCommissionGroups = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.COMMISSION_GROUPS + id);
    if (res.success) {
        dispatch(getCommissionGroups(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getCommissionGroups, addCommissionGroups, getCommissionGroup, editCommissionGroups, deleteCommissionGroups };
