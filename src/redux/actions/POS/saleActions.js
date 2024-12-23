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
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('post', endPoints.POS.SALE, data);
    if (res.success) {
        next(res.data);
        dispatch(addRecentMemberAction(data.member));
        dispatch(showToast({ severity: 'success', summary: res.message }));
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    if (setLoading) {
        setLoading(false);
    }
};
const getReceiptsAction = () => async (dispatch) => {
    const res = await api('get', endPoints.POS.SALE);
    if (res.success) {
        dispatch({
            type: types.POS.RECEIPT,
            payload: res.data,
        });
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
};
const getReceiptAction = (id, setLoading, next) => async (dispatch) => {
    setLoading(true);
    const res = await api('get', endPoints.POS.SALE + id);
    if (res.success) {
        next(res.data);
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};

const receiptsVoidAction = (id, accessCode, setLoading, next) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('put', endPoints.POS.VOID + id, { accessCode });
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    if (setLoading) {
        setLoading(false);
    }
};
const receiptsReturnAction = (id, accessCode, paymentType, setLoading, next) => async (dispatch) => {
    if (setLoading) {
        setLoading(true);
    }
    const res = await api('put', endPoints.POS.RETURN + id, { accessCode, paymentType });
    if (res.success) {
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    if (setLoading) {
        setLoading(false);
    }
};
const addNoSale = (data, setLoading, next) => async (dispatch) => {
    setLoading(true);

    const res = await api('post', endPoints.POS.NO_SALE, data);
    if (res.success) {
        dispatch(showToast({ severity: 'success', summary: res.message }));
        next();
    } else {
        dispatch(showToast({ severity: 'error', summary: res.message }));
    }
    setLoading(false);
};
export { onCheckoutAction, addRecentMemberAction, getReceiptsAction, getReceiptAction, addNoSale, receiptsVoidAction, receiptsReturnAction };
