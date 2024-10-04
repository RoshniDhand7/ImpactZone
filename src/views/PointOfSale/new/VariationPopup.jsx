import React from 'react';
import CustomDialog from '../../../shared/Overlays/CustomDialog';
import { CustomDropDown } from '../../../shared/Input/AllInputs';
import { useState } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';

export default function VariationPopup({ visible, onCancel, onAddItemIntoCart }) {
    const [data, setData] = useState({
        variation: '',
        subVariation: '',
    });

    useEffect(() => {
        setData({
            variation: '',
            subVariation: '',
        });
    }, [visible]);

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const variationsDropdown = useMemo(() => {
        return visible?.variations.map((item) => ({ ...item, variationId: item._id, name: item.variationName }));
    }, [visible]);

    const subVariationDropdown = useMemo(() => data?.variation?.subVariations?.map((item) => ({ ...item, name: item.subVariation })), [data?.variation]);

    const onAddVariationInCart = () => {
        if (data?.subVariation) {
            let product = visible;
            let { netPrice, defaultQuantity, minimumQuantity, maximumQuantity, _id, name } = data?.subVariation;

            let productObj = {
                ...product,
                subVariationId: _id,
                itemCaption: `${product?.itemCaption}(${name})`,
                netPrice,
                defaultQuantity,
                minimumQuantity,
                maximumQuantity,
            };

            onAddItemIntoCart(productObj);
            onCancel();
        }
    };
    return (
        <CustomDialog title="Select Variation" visible={visible} onCancel={onCancel} onSave={onAddVariationInCart} saveLabel="Add To Cart">
            <CustomDropDown data={data} onChange={handleChange} col={12} label="Variations" name="variation" options={variationsDropdown} />
            <CustomDropDown data={data} onChange={handleChange} col={12} label="Sub Variations" name="subVariation" options={subVariationDropdown} />
        </CustomDialog>
    );
}
