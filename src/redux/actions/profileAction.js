import api from '../../services/api';
import { authenticate, isAuthenticated } from '../../services/auth';
import endPoints from '../../services/endPoints';
import { types } from '../types/types';
// import { hideLoaderAction, showLoaderAction } from './loaderAction';
import { showToast } from './toastAction';

const onLogin = (payload, history, setLoading) => async (dispatch) => {
    setLoading(true);
    payload = { email: payload.email, password: payload.password };
    const res = await api('post', endPoints.LOGIN, payload);
    if (res.success) {
        dispatch({ type: types.PROFILE, payload: res.data });
        authenticate(res.data.token, () => {
            if (isAuthenticated()) {
                history.push('/dashboard');
            } else {
                history.push('/');
            }
        });
    } else {
        dispatch(
            showToast({
                type: 'error',
                title: res.message,
            }),
        );
    }
    setLoading(false);
};

const getProfile = () => async (dispatch) => {
    const res = await api('get', endPoints.PROFILE);
    console.log('res>>', res);
    if (res.success) {
        dispatch({ type: types.PROFILE, payload: res.data });
    } else {
        dispatch(
            showToast({
                type: 'error',
                title: res.message,
            }),
        );
    }
};
export { onLogin, getProfile };
