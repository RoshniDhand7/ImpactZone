import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteCatalogItem, getCatalogItems } from '../../../../redux/actions/InventorySettings/catalogItemsAction';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';

const CatalogItems = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCatalogItems());
    }, [dispatch]);

    const { allCatalogItems } = useSelector((state) => state.catalogItems);

    const columns = [
        { field: 'name', header: 'Item Name' },
        { field: 'upc', header: 'Item UPC' },
        { field: 'unitPrice', header: 'Price' },
        { field: 'displayInPos', header: 'Event' },
        { field: 'isActive', header: 'Active' },
    ];

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteCatalogItem(col._id, () => {}));
            },
            'Do you want to delete this Categories?',
            position,
        );
    };
    const onEdit = (col) => {
        history.push(`/settings/inventory/catalog-item/edit/${col._id}`);
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Catalog Items" linkTo="/settings/inventory/catalog-item/add" />
            <CustomTable data={allCatalogItems} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default CatalogItems;
