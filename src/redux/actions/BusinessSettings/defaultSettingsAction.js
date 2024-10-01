import api from '../../../services/api';
import endPoints from '../../../services/endPoints';
import { showToast } from '../toastAction';

const addDefaultSettings = (data, setLoading) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }

    const res = await api('post', endPoints.DEFAULT_SETTINGS, data);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    if (setLoading) {
        setLoading(false);
    }
};

const getdefaultSetting = (returnData) => async () => {
    const res = await api('get', endPoints.DEFAULT_SETTINGS);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
};

export { addDefaultSettings, getdefaultSetting };
