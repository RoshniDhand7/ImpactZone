import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';

const getMembers = () => async (dispatch) => {
    const res = await api('get', EndPoints.GET_MEMBERS);
    if (res.success) {
        dispatch({
            type: types.CHANGE_MEMBERS,
            payload: res.data,
        });
    } else {
        // dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

const getMemberAction = (id) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.MEMBERS_V2.MEMBERS + id);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_VIEW_MEMBERS,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction());
};

export { getMembers, getMemberAction };
