import React, { useState } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { useDispatch } from 'react-redux';
import { deleteProfitCenters } from '../../../../redux/actions/InventorySettings/profitCenterAction';
import useFilters from '../../../../hooks/useFilters';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useProfitCenters from '../../../../hooks/Inventory/useProfitCenters';
import FilterComponent from '../../../../components/FilterComponent';
import { CustomDropDown } from '../../../../shared/Input/AllInputs';
import { ActiveFilterDropdown } from '../../../../utils/dropdownConstants';

export default function ProfitCenter() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { allProfitCenters } = useProfitCenters();
    const columns = [
        { field: 'name', header: 'Name', sortable: true },
        { field: 'description', header: 'Description' },
        { field: 'ProfitCenterType', header: 'Catelog Items Assigned' },
        { field: 'glCode', header: 'GL Code', sortable: true },
        { field: 'isActive', header: 'Active' },
    ];

    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allProfitCenters);

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteProfitCenters(col._id, () => {}));
            },
            'Do you want to delete this Profit Center?',
            position,
        );
    };
    const onEdit = (col) => {
        history.push(`/settings/inventory/profit-center/edit/${col._id}`);
    };

    const [data, setData] = useState({
        filterType: 'AND',
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Profit Center" linkTo="/settings/inventory/profit-center/add" contentPosition="end">
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
                </CustomGridLayout>
            </FilterComponent>
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}
