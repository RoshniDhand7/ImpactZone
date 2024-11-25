import api from '../../services/api';
import endPoints from '../../services/endPoints';
import { showToast } from './toastAction';

const validateAccessCodeAction = (accessCode, setLoading, next) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', endPoints.VALIDATE_ACCESS_CODE + accessCode);
    if (res.success) {
        next(res.data);
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    if (setLoading) {
        setLoading(false);
    }
};

const createEndpoint = (base, paths) => {
    return Object.fromEntries(Object.entries(paths).map(([key, value]) => [key, `${base}${value}/`]));
};

export { validateAccessCodeAction, createEndpoint };
