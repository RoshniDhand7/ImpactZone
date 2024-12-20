import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideTableLoaderAction, showTableLoaderAction } from '../loaderAction';

const getActivePlans = () => async (dispatch) => {
    dispatch(showTableLoaderAction());
    const res = await api('get', EndPoints.PLANS.ACTIVE);
    if (res.success) {
        dispatch({
            type: types.PLANS.ACTIVE,
            payload: res.data,
        });
    }
    dispatch(hideTableLoaderAction());
};

const getActivePlan = (id, returnData) => async () => {
    const res = await api('get', EndPoints.PLANS.ACTIVE + id);
    if (res.success) {
        if (returnData) {
            returnData(res.data);
        }
    }
};
const getMemberDetails = (id, returnData) => async () => {
    const res = await api('get', EndPoints.PLANS.MEMBER + id);
    if (res.success) {
        if (returnData) {
            returnData(res.data);
        }
    }
};
export { getActivePlans, getActivePlan, getMemberDetails };
