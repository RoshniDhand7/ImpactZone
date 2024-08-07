import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { removeUnusedKeys } from '../../../utils/commonFunctions';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getVendors = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.VENDORS);
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
    const payload = removeUnusedKeys({ ...data, ...(data?.phone && { phone: data?.phone?.replace(/\D/g, '') }) });
    // const payload = {  };

    const res = await api('post', EndPoints.VENDORS, payload);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editVendors = (id, data, setLoading, history) => async () => {
    setLoading(true);

    const payload = {
        ...data,
        ...(data?.phone && { phone: data?.phone?.replace(/\D/g, '') }),
        ...(data?.repCellPhone && { phone: data?.repCellPhone?.replace(/\D/g, '') }),
    };

    const res = await api('put', EndPoints.VENDORS + id, payload);
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
