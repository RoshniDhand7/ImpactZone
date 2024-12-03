import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMembershipPlans } from '../../redux/actions/Settings/AgreementSetup/agreementPlanAction';

const useAgreementPlan = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMembershipPlans());
    }, [dispatch]);

    const { agreementPlans, agreementPlansDropdown } = useSelector((state) => state.settings.agreement);

    return { agreementPlans, agreementPlansDropdown };
};

export default useAgreementPlan;
