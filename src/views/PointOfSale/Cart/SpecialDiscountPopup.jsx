import React, { useState, useEffect } from 'react';
import CustomDialog from '../../../shared/Overlays/CustomDialog';
import { CustomDropDown, CustomInputNumber } from '../../../shared/Input/AllInputs';
import { amountTypeOptions } from '../../../utils/dropdownConstants';
import { CustomGridLayout } from '../../../shared/Cards/CustomCard';

export default function SpecialDiscountPopup({ visible, setVisible, onApply }) {
    const [data, setData] = useState({ amountType: 'FIXED', amount: 0 });

    const onClose = () => {
        setVisible(false);
        setData({ amountType: 'FIXED', amount: 0 });
    };

    useEffect(() => {
        if (visible?.item) {
            setData(visible?.item);
        }
    }, [visible]);

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = () => {
        if (data?.amount) {
            onApply(visible.index, data);
            onClose();
        }
    };
    return (
        <CustomDialog title="Add Special Discount" visible={visible} onCancel={onClose} onApply={onSubmit}>
            <CustomGridLayout>
                <CustomDropDown name="amountType" options={amountTypeOptions} data={data} onChange={handleChange} col={4} />
                <CustomInputNumber
                    label={`Amount (${data?.amountType === 'FIXED' ? '$' : '%'})`}
                    name="amount"
                    data={data}
                    onChange={handleChange}
                    required
                    maxFractionDigits={4}
                    col={8}
                />
            </CustomGridLayout>
        </CustomDialog>
    );
}
