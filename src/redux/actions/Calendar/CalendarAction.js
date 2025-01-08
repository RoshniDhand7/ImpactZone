import api from '../../../services/api';
import endPoints from '../../../services/endPoints';
import { types } from '../../types/types';

const getCalendarEvents = () => async (dispatch) => {
    const res = await api('get', endPoints.CALENDAR.EVENTS);
    if (res.success) {
        if (res.data) {
            dispatch({
                type: types.CALENDAR.EVENTS,
                payload: res.data,
            });
        }
    }
};

const getCalendarLocations = () => async (dispatch) => {
    const res = await api('get', endPoints.CALENDAR.LOCATIONS);
    if (res.success) {
        if (res.data) {
            dispatch({ type: types.CALENDAR.LOCATIONS, payload: res.data });
        }
    }
};
const getCalendarResources = () => async (dispatch) => {
    const res = await api('get', endPoints.CALENDAR.RESOURCES);
    if (res.success) {
        if (res.data) {
            dispatch({ type: types.CALENDAR.RESOURCES, payload: res.data });
        }
    }
};

const getAllCalendarEvents = () => async (dispatch) => {
    const res = await api('get', endPoints.CALENDAR.CLASSES);
    if (res.success) {
        if (res.data) {
            dispatch({ type: types.CALENDAR.CLASSES, payload: res.data });
        }
    }
};
const calendarBooking = (data, setLoading, next) => async () => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('post', endPoints.CALENDAR.BOOKING, data);
    if (res.success) {
        if (res.data) {
            next();
        }
    }
    if (setLoading) {
        setLoading(false);
    }
};
const getAllCalendarBooking = () => async (dispatch) => {
    const res = await api('get', endPoints.CALENDAR.BOOKING);
    if (res.success) {
        if (res.data) {
            dispatch({ type: types.CALENDAR.BOOK_EVENTS, payload: res.data });
        }
    }
};

export { getCalendarEvents, getCalendarLocations, getAllCalendarEvents, getCalendarResources, calendarBooking, getAllCalendarBooking };
