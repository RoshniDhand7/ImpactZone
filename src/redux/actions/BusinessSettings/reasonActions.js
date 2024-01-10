import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getReasonsDetails = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.REASON_CODE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_REASON_CODE,
                payload: res.data,
            });
        }
    }
    if (setLoading) {
        setLoading(false);
    }
};
const addReasonCode = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.REASON_CODE, data);
    if (res.success) {
        history.goBack();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    }
    setLoading(false);
};
const getReasonCode = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.REASON_CODE + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};
const editReasonCode = (id, data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('put', EndPoints.REASON_CODE + id, data);
    if (res.success) {
        history.goBack();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    }
    setLoading(false);
};
const deleteReasonCode = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.REASON_CODE + id);
    if (res.success) {
        dispatch(getReasonsDetails(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
export { getReasonsDetails, addReasonCode, editReasonCode, deleteReasonCode, getReasonCode };
