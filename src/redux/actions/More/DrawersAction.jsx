import moment from 'moment';
import api from '../../../services/api';
import endPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { showToast } from '../toastAction';

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
            fromDate: moment(data?.from).format('DD-MM-YYYY'),
            toDate: moment(data?.to).format('DD-MM-YYYY'),
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
