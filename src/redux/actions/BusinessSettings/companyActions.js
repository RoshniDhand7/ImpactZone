import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { showToast } from '../toastAction';

const getCompanyDetails = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.COMPANY);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_COMPANY,
                payload: res.data,
            });
        }
    }
    if (setLoading) {
        setLoading(false);
    }
};
const editCompany = (data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('put', EndPoints.COMPANY, data);
    if (res.success) {
        history.goBack();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    }
    setLoading(false);
};
export { getCompanyDetails, editCompany };
