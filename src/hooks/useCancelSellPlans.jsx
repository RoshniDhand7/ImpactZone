import { useDispatch } from 'react-redux';
import { deleteSellPlan } from '../redux/actions/Plans/SellPlan';
import { useHistory } from 'react-router-dom';
import CustomConfirm from '../shared/Overlays/CustomConfirm';
import { useState } from 'react';

const useCancelSellPlans = (newPlanId) => {
    const [openCancelDialog, setOpenCancelDialog] = useState();
    const dispatch = useDispatch();
    const history = useHistory();
    const accept = () => {
        console.log('hi');
        if (newPlanId) {
            dispatch(
                deleteSellPlan(newPlanId, () => {
                    history.replace('/plans');
                }),
            );
        } else {
            history.replace('/plans');
        }
    };

    const reject = () => {
        console.log('bye');
    };

    const { confirm } = CustomConfirm('Are you sure you want to cancel ?', accept, reject);
    return { confirm, openCancelDialog };
};

export default useCancelSellPlans;
