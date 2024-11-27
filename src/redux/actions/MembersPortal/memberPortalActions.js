import api from '../../../services/api';
import endPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';

export const getMemberData = (id, key) => async (dispatch) => {
    // dispatch(showLoaderAction());
    const res = await api('get', endPoints.MEMBERS + id);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_MEMBER_DATA,
                payload: { data: res.data, key },
            });
        }
    }
    // dispatch(hideLoaderAction());
};
