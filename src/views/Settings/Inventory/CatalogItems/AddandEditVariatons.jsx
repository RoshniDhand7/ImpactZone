import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomChipInput, CustomInput } from '../../../../shared/Input/AllInputs';
import {
    editVariationCatalog,
    getCatalogItem,
    getCatalogVariations,
    getVariationCatalog,
} from '../../../../redux/actions/InventorySettings/catalogItemsAction';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';

const AddandEditVariatons = ({ visible, setOpen, setVariationId, variationId, catalogId, catelogItem }) => {
    const inistailState = {
        variationName: '',
        subVariation: [],
        upc: 1,
        unitPrice: 1,
        minimumQuantity: 1,
        maximumQuantity: 1,
        wholesaleCost: 1,
        defaultQuantity: 1,
    };
    const [data, setData] = useState(inistailState);
    const onClose = () => {
        setOpen(false);
        setVariationId('');
        setData({
            ...data,
            variationName: '',
            subVariation: [],
        });
    };

    const dispatch = useDispatch();

    useEffect(() => {
        if (catelogItem) {
            setData({
                variationName: '',
                subVariation: [],
                upc: catelogItem.upc,
                sku: 1,
                taxable: true,
                netPrice: catelogItem.netPrice,
                minimumQuantity: catelogItem.minimumQuantity,
                maximumQuantity: catelogItem.maximumQuantity,
                wholesaleCost: catelogItem.wholesaleCost,
                defaultQuantity: catelogItem.defaultQuantity,
            });
        }
    }, [catelogItem]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    useEffect(() => {
        if (variationId) {
            dispatch(
                getVariationCatalog(variationId, (dt) => {
                    setData((prev) => ({ ...prev, variationName: dt.variationName }));
                }),
            );
        }
    }, [variationId, dispatch]);

    const handleSave = () => {
        if (catalogId) {
            if (showFormErrors(data, setData)) {
                const payload = {
                    ...data,
                    _id: variationId,
                };
                dispatch(
                    editVariationCatalog(catalogId, payload, () => {
                        onClose();
                        setData({
                            ...data,
                            variationName: '',
                            subVariation: [],
                        });
                        dispatch(getCatalogVariations(catalogId));
                    }),
                );
            }
        }
    };

    const loading = useSelector((state) => state.loader.isLoading);

    return (
        <CustomDialog title={variationId ? 'Edit Variations' : 'Add Variations'} visible={visible} onCancel={onClose} loading={loading} onSave={handleSave}>
            <CustomGridLayout>
                <CustomInput name="variationName" col={12} data={data} onChange={handleChange} />
                <CustomChipInput data={data} name="subVariation" onChange={handleChange} col={12} />
            </CustomGridLayout>
        </CustomDialog>
    );
};

export default AddandEditVariatons;
