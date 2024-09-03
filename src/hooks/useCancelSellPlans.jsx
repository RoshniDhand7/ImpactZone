import { useDispatch } from 'react-redux';
import { deleteSellPlan } from '../redux/actions/Plans/SellPlan';
import { useHistory } from 'react-router-dom';
import CustomConfirm from '../shared/Overlays/CustomConfirm';

const useCancelSellPlans = (newPlanId) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const accept = () => {
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

    const reject = () => {};

    const { confirm } = CustomConfirm('Are you sure you want to cancel ?', accept, reject);
    return { confirm };
};

export default useCancelSellPlans;
