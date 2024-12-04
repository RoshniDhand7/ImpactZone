import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { hideTableLoaderAction, showTableLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getPrePays = () => async (dispatch, getState) => {
    const state = getState();
    if (!state.settings.inventory.prePays.length) {
        dispatch(showTableLoaderAction());
    }
    const res = await api('get', EndPoints.SETTINGS.INVENTORY_SETUP.PRE_PAY);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.INVENTORY.PRE_PAY,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideTableLoaderAction());
};
const getPrePay = (id, returnData) => async () => {
    const res = await api('get', EndPoints.SETTINGS.INVENTORY_SETUP.PRE_PAY + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
};
const addPrePay = (payload, setLoading, history) => async (dispatch) => {
    setLoading(true);
    const res = await api('post', EndPoints.SETTINGS.INVENTORY_SETUP.PRE_PAY, payload);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editPrePay = (id, payload, setLoading, history) => async () => {
    setLoading(true);
    const res = await api('put', EndPoints.SETTINGS.INVENTORY_SETUP.PRE_PAY + id, payload);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deletePrePay = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SETTINGS.INVENTORY_SETUP.PRE_PAY + id);
    if (res.success) {
        dispatch(getPrePays());
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getPrePays, addPrePay, editPrePay, deletePrePay, getPrePay };
