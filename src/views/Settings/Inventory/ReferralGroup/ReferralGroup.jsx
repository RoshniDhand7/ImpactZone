import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReferralGroups, getReferralGroups } from '../../../../redux/actions/InventorySettings/referralGroupAction';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import ActiveFilter from '../../../../components/Filters/ActiveFilter';

export default function ReferralGroup() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getReferralGroups());
    }, [dispatch]);

    const { allReferralGroups } = useSelector((state) => state.referralGroup);
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allReferralGroups);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'amount', header: 'Amount' },
        { field: 'noOfCatalogItems', header: 'No. of Catelog Items' },
        { field: 'isActive', header: 'Active' },
    ];

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteReferralGroups(col._id, () => {}));
            },
            'Do you want to delete this Referral Group?',
            position,
        );
    };
    const onEdit = (col) => {
        history.push(`/settings/inventory/referral-group/edit/${col._id}`);
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Referral Group" linkTo="/settings/inventory/referral-group/add" contentPosition="end">
                <div className="text-end w-full">
                    <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
                </div>
            </CustomFilterCard>
            <ActiveFilter filters={filters} onApplyFilters={onApplyFilters} isFilterVisible={isFilterVisible} onFilterClose={onFilterClose} />
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}
