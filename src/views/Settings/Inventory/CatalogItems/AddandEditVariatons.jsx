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

const AddandEditVariatons = ({ visible, setOpen, setVariationId, variationId, catalogId }) => {
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
        if (catalogId) {
            dispatch(
                getCatalogItem(catalogId, (data) => {
                    setData({
                        variationName: '',
                        subVariation: [],
                        upc: data.upc,
                        sku: 1,
                        taxable: false,
                        unitPrice: data.unitPrice,
                        minimumQuantity: data.minimumQuantity,
                        maximumQuantity: data.maximumQuantity,
                        wholesaleCost: data.wholesaleCost ? data.wholesaleCost : 1,
                        defaultQuantity: data.defaultQuantity,
                    });
                }),
            );
        }
    }, [catalogId, dispatch]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    useEffect(() => {
        if (variationId) {
            dispatch(
                getVariationCatalog(variationId, (dt) => {
                    if (variationId) {
                        setData((prev) => ({ ...prev, variationName: dt.variationName }));
                    }
                }),
            );
        }
    }, [variationId, dispatch]);

    const handleSave = () => {
        if (catalogId) {
            if (showFormErrors(data, setData)) {
                const payload = {
                    variationName: data.variationName,
                    subVariation: data.subVariation,
                    _id: variationId,
                    upc: data.upc,
                    unitPrice: data.unitPrice,
                    variationMinQuantity: data.minimumQuantity,
                    variationMaxQuantity: data.maximumQuantity,
                    variationWholesaleCost: data.wholesaleCost,
                    defaultQuantity: data.defaultQuantity,
                    sku: data.sku,
                    taxable: data.taxable,
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
