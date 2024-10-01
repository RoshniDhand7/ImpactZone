import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMembershipPlans } from '../../redux/actions/AgreementSettings/membershipPlan';

const useAgreementPlan = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMembershipPlans());
    }, [dispatch]);

    const { allMembershipPlan, allMembershipPlanDropdown } = useSelector((state) => state.membershipPlan);

    return { allMembershipPlan, allMembershipPlanDropdown };
};

export default useAgreementPlan;
