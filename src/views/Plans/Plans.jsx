import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../shared/Cards/CustomCard';
import CustomTable from '../../shared/Table/CustomTable';
import { getMembershipPlans } from '../../redux/actions/AgreementSettings/membershipPlan';
import { useDispatch, useSelector } from 'react-redux';
import cart from '../../assets/icons/cart.png';
import { Tooltip } from 'primereact/tooltip';
import { useHistory } from 'react-router-dom';
import PrimaryButton from '../../shared/Button/CustomButton';

export default function Plans() {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(getMembershipPlans());
    }, [dispatch]);

    const { allMembershipPlan } = useSelector((state) => state.membershipPlan);

    const columns = [
        { field: 'name', header: ' Plan ' },
        { field: 'category', header: 'Category' },
        { field: 'timePeriod', body: (r) => `${r.timePeriod} Month`, header: 'Duration' },
    ];

    const customActionTemplate = (r) => {
        return (
            <>
                <Tooltip target=".carttooltip" content="Sell Plan" position="bottom" />
                <img
                    src={cart}
                    alt="cart"
                    style={{ width: '20px', height: '20px' }}
                    className="carttooltip"
                    onClick={() => history.replace(`/plans/sell-plan/${r._id}`)}
                />
            </>
        );
    };
    return (
        <div>
            <CustomFilterCard title="Membership">
                <PrimaryButton onClick={() => history.push('/plans/drafts')}>Drafts</PrimaryButton>
            </CustomFilterCard>
            <CustomTable data={allMembershipPlan} columns={columns} customActionTemplate={customActionTemplate} />
        </div>
    );
}
