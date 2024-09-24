import React from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { confirmDelete, truncateDescription } from '../../../../utils/commonFunctions';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../../../redux/actions/InventorySettings/categoriesAction';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import useCategory from '../../../../hooks/Inventory/useCategory';
import ActiveFilter from '../../../../components/Filters/ActiveFilter';

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

    return (
        <>
            <CustomFilterCard buttonTitle="Add Categories" linkTo="/settings/inventory/categories/add" contentPosition="end">
                <div className="text-end w-full">
                    <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
                </div>
            </CustomFilterCard>
            <ActiveFilter filters={filters} onApplyFilters={onApplyFilters} isFilterVisible={isFilterVisible} onFilterClose={onFilterClose} />
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}
