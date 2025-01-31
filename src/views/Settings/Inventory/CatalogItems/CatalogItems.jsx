import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { confirmDelete, showFormErrors } from '../../../../utils/commonFunctions';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { CustomInput } from '../../../../shared/Input/AllInputs';
import formValidation from '../../../../utils/validations';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import CatalogFilters from './CatalogFilters';
import useCatalogItems from '../../../../hooks/Inventory/useCatalogItems';
import { roundOfNumber } from '../../../../utils/taxHelpers';
import { addCatalogItem, deleteCatalogItem, getCatalogItems } from '../../../../redux/actions/Settings/InventorySetup/catalogItemsAction';

const CatalogItems = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    const { allCatalogItems } = useCatalogItems();
    const { loading } = useSelector((state) => state?.loader?.isLoading);

    const columns = [
        { field: 'name', header: 'Item Name' },
        { field: 'upc', header: 'Item UPC' },
        { body: (r) => roundOfNumber(r.netPrice), header: 'Price' },
        { field: 'isActive', header: 'Active' },
    ];
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allCatalogItems);

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
    const onCopy = (col) => {
        setVisible(col);
    };
    const [data, setData] = useState({
        name: '',
    });
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const onClose = () => {
        setVisible(null);
        setData({
            name: '',
        });
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            const payload = {
                catalogImage: visible.catalogImage ? [visible.catalogImage] : [],
                type: visible.type,
                name: data.name,
                upc: visible.upc,
                profitCenter: visible.profitCenter,
                category: visible.category ?? 'NONE',
                itemCaption: visible.itemCaption,
                itemSold: visible.itemSold,
                itemRecurring: visible.itemRecurring,
                itemBeRedeemed: visible.itemBeRedeemed,
                itemPurchasedOneTime: visible.itemPurchasedOneTime,
                itemSoldOnline: visible.itemSoldOnline,
                productType: visible.productType,
                clubs: visible.clubs,
                taxes: visible.taxes,
                unitPrice: visible.unitPrice,
                promptForPrice: visible.promptForPrice,
                allowDiscount: visible.allowDiscount,
                defaultDiscount: visible.defaultDiscount,
                overrideDiscount: visible.overrideDiscount,
                moreThan1: visible.moreThan1,
                moreThan2: visible.moreThan2,
                moreThan3: visible.moreThan3,
                unitPrice1: visible.unitPrice1,
                unitPrice2: visible.unitPrice2,
                unitPrice3: visible.unitPrice3,
                stockable: visible.stockable,
                allowUnlimited: visible.allowUnlimited,
                minimumQuantity: visible.minimumQuantity,
                maximumQuantity: visible.maximumQuantity,
                defaultQuantity: visible.defaultQuantity,
                expiration: visible.expiration,
                days: visible.days,
                month: visible.month,
                itemStart: visible.itemStart,
                isActive: visible.isActive,
                wholesaleCost: visible.wholesaleCost,
            };
            dispatch(
                addCatalogItem(payload, history, '', () => {
                    onClose();
                    dispatch(getCatalogItems());
                }),
            );
        }
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Catalog Items" linkTo="/settings/inventory/catalog-item/add" contentPosition="end">
                <div className="text-end w-full">
                    <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
                </div>
            </CustomFilterCard>

            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} onCopy={onCopy} />
            <CatalogFilters onFilterClose={onFilterClose} onApplyFilters={onApplyFilters} filters={filters} isFilterVisible={isFilterVisible} />
            <CustomDialog title="Copy Catalog Items" visible={visible} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomInput col="12" name="name" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default CatalogItems;
