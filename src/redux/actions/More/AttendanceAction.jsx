import api from '../../../services/api';
import endPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { showToast } from '../toastAction';

const getAllCheckIn = (setLoading, data) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }

    data = { filterType: data.filterType, from: data.from, to: data.to, employee: data.name };
    const res = await api('get', endPoints.ATTENDANCE_CHECK_IN, {}, data);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_ATTENDANCE_CHECK_IN,
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

export { getAllCheckIn };
