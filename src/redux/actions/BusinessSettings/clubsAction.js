import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getClubs = () => async (dispatch) => {
    const res = await api('get', EndPoints.SETTINGS.BUSINESS.CLUBS);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_CLUBS,
                payload: res.data,
            });
        }
    }
};
const getClub = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.SETTINGS.BUSINESS.CLUBS + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};
const editClub = (id, data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const payload = {
        ...data,
        phoneNumber: data?.phoneNumber?.replace(/\D/g, ''),
    };

    const res = await api('put', EndPoints.SETTINGS.BUSINESS.CLUBS + id, payload);
    if (res.success) {
        history.goBack();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    }
    setLoading(false);
};

export { getClubs, getClub, editClub };
