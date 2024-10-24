import endPoints from '../../../services/endPoints';
import api from '../../../services/api';
import { types } from '../../types/types';
import { showToast } from '../toastAction';

const getRegistersAction = () => async (dispatch) => {
    const res = await api('get', endPoints.POS.REGISTER);
    if (res.success) {
        dispatch({
            type: types.POS.REGISTER,
            payload: res.data,
        });
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
const getRegisterAction = (id, next) => async (dispatch) => {
    const res = await api('get', endPoints.POS.REGISTER + id);
    if (res.success) {
        next(res.data);
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
const startRegisterAction = (data, setLoading, next) => async (dispatch) => {
    let payload = {
        accessCode: data.accessCode,
        cashAtStart: data.totalCash,
        cashRegister: data.register,
        commentAtStart: data.comment,
    };
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('post', endPoints.POS.REGISTER + '/start', payload);
    if (res.success) {
        dispatch(getRegistersAction());
        next(res.data);
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    if (setLoading) {
        setLoading(false);
    }
};
const closeRegisterAction = (data, setLoading, next) => async (dispatch) => {
    let payload = {
        id: data?.id,
        accessCode: data.accessCode,
        cashAtEnd: data.totalCash,
        totalCashSale: data.cashSale,
        cashDifference: data?.cashDifference,
        totalCashAtEnd: data?.amountToLeftIn + data?.totalCashOut,
        cashLeftIn: data?.amountToLeftIn,
        totalCashOut: data?.totalCashOut,
        commentAtEnd: data?.comment,
    };
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('post', endPoints.POS.REGISTER + '/end', payload);
    if (res.success) {
        dispatch(getRegistersAction());
        next(res.data);
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    if (setLoading) {
        setLoading(false);
    }
};
const getRegistersStatusAction = () => async (dispatch) => {
    const res = await api('post', endPoints.POS.REGISTER_STATUS);
    if (res.success) {
        dispatch({
            type: types.POS.REGISTER_STATUS,
            payload: res.data,
        });
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getRegistersAction, getRegisterAction, startRegisterAction, closeRegisterAction, getRegistersStatusAction };
