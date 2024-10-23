import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { timeString } from '../../../../utils/commonFunctions';
import { types } from '../../../types/types';
import { showToast } from '../../toastAction';

const getRegistersAction = () => async (dispatch) => {
    const res = await api('get', EndPoints.SETTINGS.POS.REGISTER);
    if (res.success) {
        dispatch({
            type: types.SETTINGS.POS.REGISTER,
            payload: res.data,
        });
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
};
const getRegisterAction = (id, next) => async (dispatch) => {
    const res = await api('get', EndPoints.SETTINGS.POS.REGISTER + id);
    if (res.success) {
        next(res.data);
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
};
const addRegisterAction = (data, setLoading, history) => async (dispatch) => {
    let payload = { ...data, autoCloseableTime: data?.autoCloseableTime ? timeString(data?.autoCloseableTime) : '' };

    setLoading(true);
    const res = await api('post', EndPoints.SETTINGS.POS.REGISTER, payload);
    if (res.success) {
        history.goBack();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    setLoading(false);
};
const editRegisterAction = (id, data, setLoading, history) => async (dispatch) => {
    let payload = { ...data, autoCloseableTime: data?.autoCloseableTime ? timeString(data?.autoCloseableTime) : '' };

    setLoading(true);
    const res = await api('put', EndPoints.SETTINGS.POS.REGISTER + id, payload);
    if (res.success) {
        history.goBack();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    setLoading(false);
};
export { getRegistersAction, getRegisterAction, addRegisterAction, editRegisterAction };
