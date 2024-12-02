import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';

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

export { getMembers, getMemberAction };
