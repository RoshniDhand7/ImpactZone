import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomChipInput, CustomInput } from '../../../../shared/Input/AllInputs';
import formValidation from '../../../../utils/validations';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { editVariationCatalog, getCatalogVariations, getVariationCatalog } from '../../../../redux/actions/Settings/InventorySetup/catalogItemsAction';

const AddandEditVariatons = ({ visible, setOpen, setVariationId, variationId, catalogId, catelogItem }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({ variationName: '', subVariations: [] });
    const onClose = () => {
        setOpen(false);
        setVariationId('');
        setData({ variationName: '', subVariations: [] });
    };

    const orgSubVariations = useRef([]);

    useEffect(() => {
        if (catelogItem) {
            setData({
                variationName: '',
                subVariations: [],
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
                    const result = dt.subVariation?.map((item) => item.subVariation) || [];
                    orgSubVariations.current = result;
                    setData((prev) => ({ ...prev, variationName: dt.variationName, subVariations: result }));
                }),
            );
        }
    }, [variationId, dispatch]);

    const handleSave = () => {
        if (catalogId) {
            if (showFormErrors(data, setData)) {
                //remove the duplicated sub-variations
                data.subVariations = data.subVariations.filter((item) => !orgSubVariations.current?.includes(item)) || [];
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
                            subVariations: [],
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
                <CustomChipInput data={data} name="subVariations" onChange={handleChange} col={12} />
            </CustomGridLayout>
        </CustomDialog>
    );
};

export default AddandEditVariatons;
