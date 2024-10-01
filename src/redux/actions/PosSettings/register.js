import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getRegisters = () => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.REGISTERS, {});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_REGISTERS,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    dispatch(hideLoaderAction());
};

const getRegister = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.REGISTERS + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addRegister = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', EndPoints.REGISTERS, data);
    if (res.success) {
        history.goBack();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};
const editRegister = (id, data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('put', EndPoints.REGISTERS + id, data);
    if (res.success) {
        history.goBack();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};

export { getRegisters, getRegister, addRegister, editRegister };
