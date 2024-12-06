import React, { useEffect, useState } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import FilterComponent from '../../../../components/FilterComponent';
import { CustomDropDown, CustomMultiselect } from '../../../../shared/Input/AllInputs';
import useCatalogItems from '../../../../hooks/Inventory/useCatalogItems';
import { ActiveFilterDropdown } from '../../../../utils/dropdownConstants';
import { deleteReferralGroups, getReferralGroups } from '../../../../redux/actions/Settings/InventorySetup/referralGroupAction';

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

    const [data, setData] = useState({
        filterType: 'AND',
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const { catalogDropDown } = useCatalogItems();

    return (
        <>
            <CustomFilterCard buttonTitle="Add Referral Group" linkTo="/settings/inventory/referral-group/add" contentPosition="end">
                <div className="text-end w-full">
                    <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
                </div>
            </CustomFilterCard>
            <FilterComponent
                value={filters}
                onApply={onApplyFilters}
                visible={isFilterVisible}
                onHide={onFilterClose}
                data={data}
                handleChange={handleChange}
                setData={setData}
            >
                <CustomGridLayout>
                    <CustomDropDown col={12} label="Status" name="isActive" options={ActiveFilterDropdown} data={data} onChange={handleChange} showClear />
                    <CustomMultiselect col={12} label="Catalog Items" name="catalogs" options={catalogDropDown} data={data} onChange={handleChange} showClear />
                </CustomGridLayout>
            </FilterComponent>
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}
