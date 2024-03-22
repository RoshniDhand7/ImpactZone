import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteCatalogItem, getCatalogItems } from '../../../../redux/actions/InventorySettings/catalogItemsAction';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { CustomFilterCard, CustomOverlay } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { CustomDropDown } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { LightButton } from '../../../../shared/Button/CustomButton';
import { OverlayPanel } from 'primereact/overlaypanel';

const CatalogItems = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const openOverlay = useRef(null);
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
        // { field: '', header: <PrimaryButton name="Deploy" className={'text-white'} label="Deploy  Selected Items" outlined /> },
    ];

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteCatalogItem(col._id, () => {}));
            },
            'Do you want to delete this Catalog Item?',
            position,
        );
    };
    const onEdit = (col) => {
        history.push(`/settings/inventory/catalog-item/edit/${col._id}`);
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Catalog Items" linkTo="/settings/inventory/catalog-item/add">
                {/* <div className="col-12 flex  align-item-center p-0">
                    <CustomDropDown name="productType" col={8} />
                    <PrimaryButton label="Advanced Filters" col={4} onClick={(e) => openOverlay.current.toggle(e)} />
                </div> */}
            </CustomFilterCard>
            <CustomOverlay ref={openOverlay} col={6}>
                <div className="grid">
                    <CustomDropDown name="profitCenter" col={6} />
                    <CustomDropDown name="itemStatus" col={6} />
                    <CustomDropDown name="onlineStatus" col={6} />
                    <CustomDropDown name="club" col={6} />
                    <CustomDropDown name="salesItem" col={6} />
                    <CustomDropDown name="POSCategory" col={6} />
                    <CustomDropDown name="commissionItem" col={6} />
                    <CustomDropDown name="discountItem" col={6} />
                    <CustomDropDown name="paysForEvent" col={6} />
                    <CustomDropDown name="createdBy" col={6} />
                    <CustomDropDown name="createdDate" col={6} />
                    <CustomDropDown name="PriceRange" col={6} />
                </div>
            </CustomOverlay>
            <CustomTable data={allCatalogItems} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default CatalogItems;
