import api from '../../../services/api';
import endPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { showToast } from '../toastAction';

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

const getResourcesList = (data, setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }

    const res = await api('get', endPoints.RESOURCES_LIST, {}, { member: data?.reserveMember, date: data?.reserveDate });
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_RESOURCES_LIST,
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
const resourceReserve = (id, data, next) => async (dispatch) => {
    const res = await api('post', endPoints.RESOURCE_RESERVE + id, {
        member: data?.reserveMember,
        date: data?.reserveDate,
    });
    if (res.success) {
        if (res.data) {
            dispatch(showToast({ severity: 'success', summary: res.message }));
            next();
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
const resourceReturn = (data, reserveId, next) => async (dispatch) => {
    const res = await api('post', endPoints.RESOURCES_RETURN + reserveId, {
        date: data?.reserveDate,
    });
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getCheckIn, getRecentCheckInHistory, getCheckInLast, resourceReserve, resourceReturn, getResourcesList };
