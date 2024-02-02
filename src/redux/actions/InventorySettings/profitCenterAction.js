import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { removeUnusedKeys } from '../../../utils/commonFunctions';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getProfitCenters = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.PROFIT_CENTERS);
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
    const payload = removeUnusedKeys({ ...data });

    const res = await api('post', EndPoints.PROFIT_CENTERS, payload);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editProfitCenters = (id, data, setLoading, history) => async () => {
    setLoading(true);
    const payload = removeUnusedKeys({ ...data });

    const res = await api('put', EndPoints.PROFIT_CENTERS + id, payload);
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
