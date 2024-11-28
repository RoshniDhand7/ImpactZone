import api from '../../../services/api';
import endPoints from '../../../services/endPoints';
import { uploadImages } from '../../../utils/commonFunctions';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';
const getMemberData = (id, key) => async (dispatch, getState) => {
    const state = getState();
    console.log(state, 'state');
    if (state.membersPortal?.dashboard?._id !== id) {
        dispatch(showLoaderAction());
    }
    const res = await api('get', endPoints.MEMBERS + id);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_MEMBER_DATA,
                payload: { data: res.data, key },
            });
        }
    }
    dispatch(hideLoaderAction());
};

const getMembers = () => async (dispatch) => {
    const res = await api('get', endPoints.MEMBERS);
    if (res.success) {
        dispatch({
            type: types.CHANGE_MEMBERS,
            payload: res.data,
        });
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
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

    const res = await api('post', endPoints.MEMBERS, paylaod);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
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

    const res = await api('put', endPoints.MEMBERS + id, paylaod);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
        next();
    }
    dispatch(hideLoaderAction());
};

export { getMembers, getMemberData, addMembers, editMemberAction };
