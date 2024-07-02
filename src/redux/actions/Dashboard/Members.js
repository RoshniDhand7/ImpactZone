import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { uploadImages } from '../../../utils/commonFunctions';
import formValidation from '../../../utils/validations';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const addMembers = (data, next) => async (dispatch) => {
    dispatch(showLoaderAction());

    if (data.image.length) {
        let urls = await uploadImages(data.image);
        data.image = urls[0];
    } else {
        data.image = '';
    }

    const paylaod = {
        ...data,
        ...(data?.primaryPhone && { primaryPhone: data?.primaryPhone?.replace(/\D/g, '') }),
        ...(data?.mobilePhone && { mobilePhone: data?.mobilePhone?.replace(/\D/g, '') }),
        ...(data?.workNumber && { workNumber: data?.workNumber?.replace(/\D/g, '') }),
    };

    const res = await api('post', EndPoints.MEMBERS, paylaod);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    dispatch(hideLoaderAction());
};

const getMembers = () => async (dispatch) => {
    const res = await api('get', EndPoints.GET_MEMBERS);
    if (res.success) {
        dispatch({
            type: types.CHANGE_MEMBERS,
            payload: res.data,
        });
    } else {
        // dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

const getMemberAction = (id) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.MEMBERS + id);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_VIEW_MEMBERS,
                payload: res.data,
            });
        }
    }
    dispatch(hideLoaderAction());
};

const editMemberAction = (id, data, next) => async (dispatch) => {
    dispatch(showLoaderAction());
    if (data?.image?.length) {
        let urls = await uploadImages(data.image);
        data.image = urls[0];
    } else {
        data.image = '';
    }
    const paylaod = {
        ...data,
        ...(data?.primaryPhone && { primaryPhone: data?.primaryPhone?.replace(/\D/g, '') }),
        ...(data?.mobilePhone && { mobilePhone: data?.mobilePhone?.replace(/\D/g, '') }),
        ...(data?.workNumber && { workNumber: data?.workNumber?.replace(/\D/g, '') }),
    };

    const res = await api('put', EndPoints.MEMBERS + id, paylaod);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
        next();
    }
    dispatch(hideLoaderAction());
};
const checkbaCodeAction = (val, setData) => async (dispatch) => {
    const paylaod = {
        barCode: val,
    };

    const res = await api('post', EndPoints.MEMBER_BARCODE, paylaod);
    if (res.success) {
        setData((prev) => ({ ...prev, uniqueBarCode: false }));
    } else {
        setData((prev) => ({ ...prev, uniqueBarCode: true }));
    }
};

export { addMembers, getMembers, getMemberAction, editMemberAction, checkbaCodeAction };
