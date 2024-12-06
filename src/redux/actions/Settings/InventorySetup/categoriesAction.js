import api from '../../../../services/api';
import EndPoints from '../../../../services/endPoints';
import { removeUnusedKeys } from '../../../../utils/commonFunctions';
import { types } from '../../../types/types';
import { hideLoaderAction, showLoaderAction } from '../../loaderAction';
import { showToast } from '../../toastAction';

const getCategories = () => async (dispatch) => {
    const res = await api('get', EndPoints.CATEGORIES);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_CATEGORIES,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
};

const getCategory = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.CATEGORIES + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};

const addCategory = (data, setLoading, history) => async () => {
    setLoading(true);
    const payload = removeUnusedKeys({ ...data });

    const res = await api('post', EndPoints.CATEGORIES, payload);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const editCategory = (id, data, setLoading, history) => async () => {
    setLoading(true);

    const res = await api('put', EndPoints.CATEGORIES + id, data);
    if (res.success) {
        history.goBack();
    }
    setLoading(false);
};
const deleteCategory = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.CATEGORIES + id);
    if (res.success) {
        dispatch(getCategories(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export { getCategories, addCategory, getCategory, editCategory, deleteCategory };
