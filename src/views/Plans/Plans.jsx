import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../shared/Cards/CustomCard';
import CustomTable from '../../shared/Table/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import cart from '../../assets/icons/cart.png';
import { Tooltip } from 'primereact/tooltip';
import { useHistory } from 'react-router-dom';
import PrimaryButton from '../../shared/Button/CustomButton';
import PlanFilters from './PlanFilters';
import useFilters from '../../hooks/useFilters';
import { getActivePlans } from '../../redux/actions/Plans/plansActions';

export default function Plans() {
    const club = useSelector((state) => state.profile.club);
    const agreementPlans = useSelector((state) => state.plans.active);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(getActivePlans());
    }, [club, dispatch]);

    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(agreementPlans);

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
            <CustomFilterCard title="Membership" titleClassName="font-bold text-xl">
                <div className="flex gap-2">
                    <PrimaryButton onClick={onFilterOpen}>Filters</PrimaryButton>
                    <PrimaryButton onClick={() => history.push('/plans/drafts')}>Drafts</PrimaryButton>
                </div>
            </CustomFilterCard>
            <PlanFilters onFilterClose={onFilterClose} onApplyFilters={onApplyFilters} filters={filters} isFilterVisible={isFilterVisible} />
            <CustomTable data={tableData} columns={columns} customActionTemplate={customActionTemplate} />
        </div>
    );
}
