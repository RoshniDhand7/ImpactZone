import api from '../../../services/api';
import endPoints from '../../../services/endPoints';
import { types } from '../../types/types';

const getCheckIn = (member) => async (dispatch) => {
    const res = await api('get', endPoints.CHECK_IN, {}, { member });
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_CHECK_IN,
                payload: res.data,
            });
            dispatch(getRecentCheckInHistory());
        }
    } else {
        // dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
const getCheckInLast = () => async (dispatch) => {
    const res = await api('get', endPoints.CHECK_IN_LAST);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_CHECK_IN,
                payload: res.data,
            });
            dispatch(getRecentCheckInHistory());
        }
    } else {
        // dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

const getRecentCheckInHistory = () => async (dispatch) => {
    const res = await api('get', endPoints.RECENT_CHECK_IN);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_RECENT_CHECK_IN,
                payload: res.data,
            });
        }
    }
};

export { getCheckIn, getRecentCheckInHistory, getCheckInLast };
