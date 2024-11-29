import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { uploadImages } from '../../../../utils/commonFunctions';
import { types } from '../../../types/types';
import { hideLoaderAction, showLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getCompanyDetail = () => async (dispatch, getState) => {
    const state = getState();
    let company = state.settings.business.company;
    if (!Object.keys(company)?.length > 0) {
        dispatch(showLoaderAction());
    }
    const res = await api('get', EndPoints.SETTINGS.BUSINESS.COMPANY);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.SETTINGS.BUSINESS.COMPANY,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction());
};
const editCompany = (id, data, setLoading, history) => async (dispatch) => {
    setLoading(true);
    if (data?.logo?.length) {
        data.logo = await uploadImages(data.logo);
        data.logo = data.logo[0];
    } else {
        data.logo = '';
    }

    const res = await api('put', EndPoints.SETTINGS.BUSINESS.COMPANY + id, data);
    if (res.success) {
        history.goBack();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    }
    setLoading(false);
};
export { getCompanyDetail, editCompany };
