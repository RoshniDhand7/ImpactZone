import api from '../../../services/api';
import endPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';
const getMemberData = (id, key) => async (dispatch, getState) => {
    const state = getState();
    console.log(state, 'state');
    if (state.membersPortal?.dashboard?._id !== id) {
        dispatch(showLoaderAction());
    }
    const res = await api('get', endPoints.MEMBERS + id);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_MEMBER_DATA,
                payload: { data: res.data, key },
            });
        }
    }
    dispatch(hideLoaderAction());
};

const getMembers = () => async (dispatch) => {
    const res = await api('get', endPoints.MEMBERS);
    if (res.success) {
        dispatch({
            type: types.CHANGE_MEMBERS,
            payload: res.data,
        });
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

const getServices = () => async (dispatch) => {
    const res = await api('get', endPoints.MEMBER_SERVICES);
    if (res.success) {
        dispatch({
            type: types.CHANGE_SERVICES,
            payload: res.data,
        });
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getMembers, getMemberData, getServices };
