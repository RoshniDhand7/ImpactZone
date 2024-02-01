import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getProfitCenters = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.PROFIT_CENTERS);
    console.log(res);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_PROFIT_CENTERS,
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

const getProfitCenter = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.PROFIT_CENTERS + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addProfitCenters = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.PROFIT_CENTERS, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editProfitCenters = (id, data, setLoading, history) => async (dispatch, getState) => {
    setLoading(true);

    const res = await api('put', EndPoints.PROFIT_CENTERS + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteProfitCenters = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.PROFIT_CENTERS + id);
    if (res.success) {
        dispatch(getProfitCenters(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getProfitCenters, addProfitCenters, getProfitCenter, editProfitCenters, deleteProfitCenters };
