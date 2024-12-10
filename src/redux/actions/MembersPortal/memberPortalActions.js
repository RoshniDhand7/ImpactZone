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
    const res = await api('get', endPoints.MEMBERS_V2.MEMBER + id);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.MEMBER.MEMBER_DATA,
                payload: { data: res.data, key },
            });
        }
    }
    dispatch(hideLoaderAction());
};

const getMembers = () => async (dispatch) => {
    const res = await api('get', endPoints.MEMBERS_V2.MEMBERS);
    if (res.success) {
        dispatch({
            type: types.MEMBER.MEMBER,
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

    const res = await api('post', endPoints.MEMBERS_V2.MEMBERS, paylaod);
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

    const res = await api('put', endPoints.MEMBERS_V2.MEMBERS + id, paylaod);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
        next();
    }
    dispatch(hideLoaderAction());
};

const getServices = () => async (dispatch) => {
    const res = await api('get', endPoints.MEMBERS_V2.SERVICES);
    if (res.success) {
        dispatch({
            type: types.MEMBER.SERVICES,
            payload: res.data,
        });
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

const getAgreements = (id) => async (dispatch) => {
    const res = await api('get', endPoints.MEMBERS_V2.AGREEMENT, {}, { memberId: id });
    if (res.success) {
        dispatch({
            type: types.MEMBER.AGREEMENT,
            payload: res.data,
        });
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

const getAgreementView = (id, setData) => async (dispatch) => {
    const res = await api('get', endPoints.MEMBERS_V2.AGREEMENT_VIEW + id);
    if (res.success) {
        setData(res.data);
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

const getCheckIn = (id) => async (dispatch) => {
    const res = await api('get', endPoints.MEMBERS_V2.CHECK_IN, {}, { memberId: id });
    if (res.success) {
        dispatch({
            type: types.MEMBER.CHECK_IN,
            payload: res.data,
        });
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

const getDocuments = (id) => async (dispatch) => {
    const res = await api('get', endPoints.MEMBERS_V2.DOCUMENT, null, { memberId: id });
    if (res.success) {
        dispatch({
            type: types.MEMBER.DOCUMENTS,
            payload: res.data,
        });
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
const addMemberDocuments = (id, data, setLoading, next) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('post', endPoints.MEMBERS_V2.DOCUMENT + id, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    if (setLoading) {
        setLoading(false);
    }
};

const getDocumentView = (id, next) => async (dispatch) => {
    const res = await api('get', endPoints.MEMBERS_V2.DOCUMENT_VIEW + id);
    if (res.success) {
        if (res.data) {
            next(res.data);
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
const getNotes = (id) => async (dispatch) => {
    const res = await api('get', endPoints.MEMBERS_V2.NOTES, null, { memberId: id });
    if (res.success) {
        dispatch({
            type: types.MEMBER.NOTES,
            payload: res.data,
        });
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
const addMemberNotes = (id, data, setLoading, next) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('post', endPoints.MEMBERS_V2.NOTES + id, data);
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    if (setLoading) {
        setLoading(false);
    }
};
const getTasks = (id) => async (dispatch) => {
    const res = await api('get', endPoints.MEMBERS_V2.TASK + id);
    if (res.success) {
        dispatch({
            type: types.MEMBER.TASK,
            payload: res.data,
        });
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

export {
    getMembers,
    getMemberData,
    addMembers,
    editMemberAction,
    getServices,
    getAgreements,
    getCheckIn,
    getDocuments,
    getAgreementView,
    addMemberDocuments,
    getDocumentView,
    getNotes,
    addMemberNotes,
    getTasks,
};
