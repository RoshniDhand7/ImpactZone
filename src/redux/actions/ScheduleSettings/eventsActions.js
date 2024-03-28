import api from '../../../services/api';
import EndPoints from '../../../services/endPoints';
import { types } from '../../types/types';
import { hideLoaderAction, showLoaderAction } from '../loaderAction';
import { showToast } from '../toastAction';

const getEvents = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.SCHEDULE_EVENTS);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_SCHEDULE_EVENTS,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    if (setLoading) {
        setLoading(false);
    }
};

const getServicesEvents = (setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('get', EndPoints.SCHEDULE_EVENTS_LEVEL);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CHANGE_SCHEDULE_SERVICES_EVENTS,
                payload: res.data,
            });
        }
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message ?? res }));
    }
    if (setLoading) {
        setLoading(false);
    }
};
const getScheduledEvent = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.SCHEDULE_EVENTS + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};
const getScheduledEventService = (id, returnData) => async (dispatch) => {
    dispatch(showLoaderAction());
    const res = await api('get', EndPoints.SCHEDULE_EVENTS_LEVEL + id);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
    dispatch(hideLoaderAction());
};
const addScheduledEvent =
    (data, setLoading, history, tab = '') =>
    async (dispatch) => {
        setLoading(true);
        const { employee, location, member, employee1, location1, member1, memberVerification, employeeVerification, autoComplete, ...rest } = data;

        const payload = {
            ...rest,
            requiredToCreate: { employee, location, member },
            requiredtoComplete: { employee: employee1, location: location1, member: member1, memberVerification, employeeVerification, autoComplete },
        };
        const res = await api('post', EndPoints.SCHEDULE_EVENTS, payload);
        if (res.success) {
            if (tab) {
                history.replace(`/settings/schedule/events/edit/${res.data._id}/${tab}`);
            } else {
                history.goBack();
            }
            dispatch(showToast({ severity: 'success', summary: res.message }));
        } else {
            dispatch(showToast({ severity: 'error', summary: res.message }));
        }
        setLoading(false);
    };
const editScheduledEventServices = (id, data, setLoading, history) => async (dispatch) => {
    setLoading(true);

    const res = await api('put', EndPoints.SCHEDULE_EVENTS_LEVEL + id, data);
    if (res.success) {
        history.goBack();
        dispatch(showToast({ severity: 'success', summary: res.message }));
    }
    setLoading(false);
};
const editScheduledEvent =
    (id, data, setLoading, history, tab = '') =>
    async (dispatch) => {
        setLoading(true);

        const res = await api('put', EndPoints.SCHEDULE_EVENTS + id, data);
        if (res.success) {
            if (tab) {
                history.replace(`/settings/schedule/events/edit/${res.data._id}/${tab}`);
            } else {
                history.goBack();
            }
            dispatch(showToast({ severity: 'success', summary: res.message }));
        }
        setLoading(false);
    };
const singleServiceDelete = (eventId, colId, next) => async (dispatch) => {
    const res = await api('put', EndPoints.SCHEDULE_EVENT_LEVEL + eventId, {
        serviceId: colId,
    });
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
const deleteScheduledEvent = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SCHEDULE_EVENTS + id);
    if (res.success) {
        dispatch(getEvents(() => {}));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
const deleteAllServices = (id) => async (dispatch) => {
    const res = await api('delete', EndPoints.SCHEDULE_EVENTS_LEVEL + id);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
export {
    getEvents,
    addScheduledEvent,
    getScheduledEvent,
    editScheduledEvent,
    getServicesEvents,
    deleteScheduledEvent,
    getScheduledEventService,
    editScheduledEventServices,
    deleteAllServices,
    singleServiceDelete,
};
