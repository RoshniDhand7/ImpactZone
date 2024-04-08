import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getMembersipTypes = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.MEMBERSHIP_TYPES);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_MEMBERSHIP_TYPES,
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
const deleteMembershipType = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.MEMBERSHIP_TYPES + id);
    if (res.success) {
        dispatch(getMembersipTypes(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getMembersipTypes, deleteMembershipType };
