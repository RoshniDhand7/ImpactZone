import api from '../../services/api';
import { authenticate, isAuthenticated } from '../../services/auth';
import endPoints from '../../services/endPoints';
import { types } from '../types/types';
// import { hideLoaderAction, showLoaderAction } from './loaderAction';
import { showToast } from './toastAction';

const onLogin = (payload, history, setLoading) => async (dispatch) => {
    setLoading(true);
    payload = { email: payload.email, password: payload.password };
    const res = await api('post', endPoints.AUTH.LOGIN, payload);
    if (res.success) {
        dispatch({ type: types.PROFILE, payload: res.data });
        authenticate(res.data.token, () => {
            if (isAuthenticated()) {
                history.push('/dashboard');
            } else {
                history.push('/login');
            }
        });
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};
const onForgotPassword = (payload, setLoading, next) => async (dispatch) => {
    setLoading(true);
    payload = { email: payload.email };
    const res = await api('post', endPoints.AUTH.FORGOT_PASSWORD, payload);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};

const onChangeForgotPassword = (payload, history, setLoading) => async (dispatch) => {
    setLoading(true);
    const res = await api('post', endPoints.AUTH.CHANGE_FORGOT_PASSWORD, payload);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
        history.push('/login');
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};

const onChangePassword = (payload, setLoading, next) => async (dispatch) => {
    setLoading(true);
    const res = await api('post', endPoints.AUTH.CHANGE_PASSWORD, payload);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};

const getProfile = (next) => async (dispatch) => {
    const res = await api('get', endPoints.AUTH.PROFILE);
    if (res.success) {
        dispatch({ type: types.PROFILE, payload: res.data });
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
        next();
    }
};
export { onLogin, getProfile, onForgotPassword, onChangeForgotPassword, onChangePassword };

