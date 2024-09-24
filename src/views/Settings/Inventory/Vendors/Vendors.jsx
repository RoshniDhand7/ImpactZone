import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVendors, getVendors } from '../../../../redux/actions/InventorySettings/vendorsAction';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import ActiveFilter from '../../../../components/Filters/ActiveFilter';

export default function Vendors() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVendors());
    }, [dispatch]);

    const { allVendors } = useSelector((state) => state.vendors);
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allVendors);

    const columns = [
        { field: 'name', header: 'Vendor Name' },
        { field: 'phone', header: 'Phone' },
        { field: 'alternateVendors', header: 'Alternate Vendor' },
        { field: 'isActive', header: 'Active' },
    ];

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteVendors(col._id, () => {}));
            },
            'Do you want to delete this Vendor?',
            position,
        );
    };
    const onEdit = (col) => {
        history.push(`/settings/inventory/vendor/edit/${col._id}`);
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Vendor" linkTo="/settings/inventory/vendor/add" contentPosition="end">
                <div className="text-end w-full">
                    <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
                </div>
            </CustomFilterCard>
            <ActiveFilter filters={filters} onApplyFilters={onApplyFilters} isFilterVisible={isFilterVisible} onFilterClose={onFilterClose} />
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}
