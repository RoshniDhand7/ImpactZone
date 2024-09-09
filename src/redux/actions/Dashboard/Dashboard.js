import api from '../../../services/api';
import endPoints from '../../../services/endPoints';
import { types } from '../../types/types';

const getDashboard = () => async (dispatch) => {
    const res = await api('get', endPoints.DASHBOARD);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_DASHBOARD,
                payload: res.data,
            });
        }
    } else {
        // dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getDashboard };
