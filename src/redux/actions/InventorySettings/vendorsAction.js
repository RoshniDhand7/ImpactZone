import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getVendors = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.VENDORS);
    console.log(res);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_VENDORS,
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

const getVendor = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.VENDORS + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addVendors = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.VENDORS, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editVendors = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.VENDORS + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteVendors = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.VENDORS + id);
    if (res.success) {
        dispatch(getVendors(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getVendors, addVendors, getVendor, editVendors, deleteVendors };
