import api from '../../services/api';
import EndPoints from '../../services/endPoints';
import { showToast } from './toastAction';
import { types } from '../types/types';

const getSearchSuggestion = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.RECENT_SUGGESSIONS);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_RECENT_SUGGESSIONS,
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

const addRecentSearch = (data, next) => async (dispatch) => {
    console.log('data2>>', data);

    const res = await api('post', EndPoints.ADD_RECENT_SUGGESSION, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
};

export { getSearchSuggestion, addRecentSearch };
