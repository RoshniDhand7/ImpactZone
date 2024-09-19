import React, { useState } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { confirmDelete, truncateDescription } from '../../../../utils/commonFunctions';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../../../redux/actions/InventorySettings/categoriesAction';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import FilterComponent from '../../../../components/FilterComponent';
import { ActiveFilterDropdown } from '../../../../utils/dropdownConstants';
import { CustomDropDown } from '../../../../shared/Input/AllInputs';
import useCategory from '../../../../hooks/Inventory/useCategory';

export default function Categories() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { allCategory } = useCategory();
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allCategory);

    const DescriptionComponent = (r, index) => {
        const truncatedDescription = truncateDescription(r.description);
        return (
            <>
                <span>{truncatedDescription}</span>
            </>
        );
    };

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'displayInPos', header: 'Displays in POS' },
        { field: 'description', body: DescriptionComponent, header: 'Description' },
        { field: 'isActive', header: 'Active' },
    ];

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteCategory(col._id, () => {}));
            },
            'Do you want to delete this Categories?',
            position,
        );
    };
    const onEdit = (col) => {
        history.push(`/settings/inventory/categories/edit/${col._id}`);
    };

    const [data, setData] = useState({
        filterType: 'AND',
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Categories" linkTo="/settings/inventory/categories/add" contentPosition="end">
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
                <CustomDropDown col={12} label="Status" name="isActive" options={ActiveFilterDropdown} data={data} onChange={handleChange} showClear />
            </FilterComponent>
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}
