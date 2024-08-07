import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomChipInput, CustomInput } from '../../../../shared/Input/AllInputs';
import { editVariationCatalog, getCatalogVariations, getVariationCatalog } from '../../../../redux/actions/InventorySettings/catalogItemsAction';

const AddandEditVariatons = ({ visible, setOpen, setVariationId, variationId, catalogId }) => {
    const [data, setData] = useState({
        variationName: '',
        subVariation: [],
    });
    const onClose = () => {
        setOpen(false);
        setVariationId('');
        setData({
            variationName: '',
            subVariation: [],
        });
    };

    const dispatch = useDispatch();

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    useEffect(() => {
        if (variationId) {
            dispatch(
                getVariationCatalog(variationId, (data) => {
                    if (variationId) {
                        setData({
                            variationName: data.variationName,
                        });
                    }
                }),
            );
        }
    }, [variationId, dispatch]);

    const handleSave = () => {
        if (catalogId) {
            dispatch(
                editVariationCatalog(catalogId, { ...data, _id: variationId }, () => {
                    onClose();
                    setData({
                        variationName: '',
                        subVariation: [],
                    });
                    dispatch(getCatalogVariations(catalogId));
                }),
            );
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
