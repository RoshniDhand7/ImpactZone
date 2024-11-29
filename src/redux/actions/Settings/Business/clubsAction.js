import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { types } from '../../../types/types';
import { hideTableLoaderAction, showTableLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getClubs = () => async (dispatch, getState) => {
    const state = getState();
    let clubs = state.settings.business.clubs;
    if (!clubs?.length) {
        dispatch(showTableLoaderAction());
    }
    const res = await api('get', EndPoints.SETTINGS.BUSINESS.CLUBS);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.BUSINESS.CLUBS,
                payload: res.data,
            });
        }
    }
    dispatch(hideTableLoaderAction());
};
const getClub = (id, returnData) => async () => {
    const res = await api('get', EndPoints.SETTINGS.BUSINESS.CLUBS + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
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
