import endPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import api from '../../../services/api';
import { showToast } from '../toastAction';

const getCatalogItems = () => async (dispatch) => {
    const res = await api('get', endPoints.POS.CATALOG);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.POS.CATELOG,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
};

export { getCatalogItems };
