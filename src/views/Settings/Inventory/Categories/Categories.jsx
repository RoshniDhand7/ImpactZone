import React, { useEffect, useState } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { confirmDelete, truncateDescription } from '../../../../utils/commonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategories } from '../../../../redux/actions/InventorySettings/categoriesAction';
import { Tooltip } from 'primereact/tooltip';

export default function Categories() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const { allCategory } = useSelector((state) => state.category);

    const DescriptionComponent = (r, index) => {
        console.log('des>>', r.description, index.rowIndex);
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
            <CustomFilterCard buttonTitle="Add Categories" linkTo="/settings/inventory/categories/add" />
            <CustomTable data={allCategory} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}
