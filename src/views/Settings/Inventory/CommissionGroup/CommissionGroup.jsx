import React, { useState } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { useDispatch } from 'react-redux';
import { deleteCommissionGroups } from '../../../../redux/actions/InventorySettings/commissionGroupAction';
import useFilters from '../../../../hooks/useFilters';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import FilterComponent from '../../../../components/FilterComponent';
import { CustomDropDown } from '../../../../shared/Input/AllInputs';
import { ActiveFilterDropdown, catalogProductTypeOptions } from '../../../../utils/dropdownConstants';
import useCommissionGroup from '../../../../hooks/Inventory/useCommissionGroup';

export default function CommissionGroup() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { allCommissionGroups } = useCommissionGroup();
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allCommissionGroups);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'type', header: 'Type' },
        { field: 'isActive', header: 'Active' },
    ];

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteCommissionGroups(col._id, () => {}));
            },
            'Do you want to delete this Commission Group?',
            position,
        );
    };
    const onEdit = (col) => {
        history.push(`/settings/inventory/commission-group/edit/${col._id}`);
    };

    const [data, setData] = useState({
        filterType: 'AND',
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Commission Group" linkTo="/settings/inventory/commission-group/add" contentPosition="end">
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
                    <CustomDropDown col={12} name="type" label="Group Type" options={catalogProductTypeOptions} data={data} onChange={handleChange} />
                    <CustomDropDown col={12} label="Status" name="isActive" options={ActiveFilterDropdown} data={data} onChange={handleChange} showClear />
                </CustomGridLayout>
            </FilterComponent>
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}
