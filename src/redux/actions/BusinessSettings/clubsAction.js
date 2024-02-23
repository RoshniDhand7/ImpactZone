import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getClubs = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.CLUBS);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_CLUBS,
                payload: res.data,
            });
        }
    }
    if (setLoading) {
        setLoading(false);
    }
};
const getClub = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.CLUBS + id);
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

    const res = await api('put', EndPoints.CLUBS + id, payload);
    if (res.success) {
        history.goBack();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    }
    setLoading(false);
};

export { getClubs, getClub, editClub };
