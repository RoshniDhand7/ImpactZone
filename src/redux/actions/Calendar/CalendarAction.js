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

const getCalendarClasses = () => async (dispatch) => {
    const res = await api('get', endPoints.CALENDAR.CLASSES);
    if (res.success) {
        if (res.data) {
            dispatch({ type: types.CALENDAR.CLASSES, payload: res.data });
        }
    }
};

export { getCalendarEvents, getCalendarLocations, getCalendarClasses };
