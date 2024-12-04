import endPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import api from '../../../services/api';

const getNoSaleReasons = (setLoading) => async (dispatch) => {
    setLoading(true);
    const res = await api('get', endPoints.POS.NO_SALE_REASON_CODE);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.POS.NO_SALE_REASON_CODE,
                payload: res.data,
            });
        }
    }
    setLoading(false);
};

export { getNoSaleReasons };
