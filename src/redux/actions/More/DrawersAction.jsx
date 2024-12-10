import api from '../../../services/api';
import endPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { showToast } from '../toastAction';
import { dateConversions } from '../../../utils/commonFunctions';

const getDrawers = (setLoading, data) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api(
        'get',
        endPoints.DRAWERS,
        {},
        {
            clubs: data?.clubs,
            status: data.isActive,
            employee: data?.employee,
            fromDate: dateConversions(data?.from),
            toDate: dateConversions(data?.to),
        },
    );
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_DRAWERS,
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

export { getDrawers };
