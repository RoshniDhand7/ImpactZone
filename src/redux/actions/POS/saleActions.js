import endPoints from '../../../services/endPoints';
import api from '../../../services/api';
import { types } from '../../types/types';
import { showToast } from '../toastAction';

const addRecentMemberAction = (member) => async (dispatch, getState) => {
    let state = getState();

    let _recents = localStorage.getItem('recent_pos_sale_members');
    let _arr = [];
    if (_recents) {
        _arr = JSON.parse(_recents);
        if (!_arr.includes(member)) {
            if (member) {
                _arr.push(member);
            }
        }
    } else {
        if (member) {
            _arr = [member];
        }
    }
    if (_arr.length) {
        let _recents = state?.members?.allMembers.filter((item) => _arr.includes(item._id));
        dispatch({ type: types.POS.RECENT_MEMBER, payload: _recents });
    }

    localStorage.setItem('recent_pos_sale_members', JSON.stringify(_arr));
};
const onCheckoutAction = (data, setLoading, next) => async (dispatch) => {
    setLoading(true);
    const res = await api('post', endPoints.POS.SALE, data);
    if (res.success) {
        next(res.data);
        dispatch(addRecentMemberAction(data.member));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};
const getReceiptsAction = (next) => async (dispatch) => {
    const res = await api('get', endPoints.POS.SALE);
    if (res.success) {
        next(res.data);
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
export { onCheckoutAction, addRecentMemberAction, getReceiptsAction };
