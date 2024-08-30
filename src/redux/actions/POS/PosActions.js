import endPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import api from '../../../services/api';
import { showToast } from '../toastAction';

const getPromoCodeDetail = (setLoading,promoCode) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', endPoints.PROMO_CODE,{},{promoCode:promoCode[0]});
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_PROMO_CODE,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message  }));
    }
    if (setLoading) {
        setLoading(false);
    }
};
export const clearPOSPromo = () => {
    return {
        type: types.CLEAR_POS_PROMO,
        payload:[]
    };
};

export {getPromoCodeDetail}