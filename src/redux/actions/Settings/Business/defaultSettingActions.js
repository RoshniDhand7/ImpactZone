import api from '../../../../services/api';
import endPoints from '../../../../services/endPoints';
import { showToast } from '../../toastAction';

const addDefaultSettings = (data) => async (dispatch) => {
    const res = await api('post', endPoints.SETTINGS.BUSINESS.DEFAULT_SETTING, data);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};

const getdefaultSetting = (returnData) => async () => {
    const res = await api('get', endPoints.SETTINGS.BUSINESS.DEFAULT_SETTING);
    if (res.success) {
        if (res.data) {
            if (returnData) {
                returnData(res.data);
            }
        }
    }
};

export { addDefaultSettings, getdefaultSetting };
