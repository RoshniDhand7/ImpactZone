import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscountTypes } from '../../../redux/actions/PosSettings/discountType';
import CustomDialog from '../../../shared/Overlays/CustomDialog';
import { CustomDropDown } from '../../../shared/Input/AllInputs';

export default function SelectDiscountPopup({ visible, setVisible, onApply }) {
    const dispatch = useDispatch();
    let { allDiscountTypes } = useSelector((state) => state.discountType);
    let allDiscountDropdown = allDiscountTypes.map((item) => ({ name: item?.discountName, value: item?._id }));

    const [data, setData] = useState({});

    useEffect(() => {
        dispatch(getDiscountTypes());
    }, [dispatch]);

    const onClose = () => {
        setVisible(false);
    };

    useEffect(() => {
        if (visible) {
            setData({ discount: visible.item?._id });
        }
    }, [visible]);

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = () => {
        if (data.discount) {
            let _newDiscount = allDiscountTypes.filter((item) => item._id === data.discount);
            onApply(visible.index, _newDiscount[0]);
            onClose();
        }
    };

    return (
        <CustomDialog title="Select Discount" visible={visible} onCancel={onClose} onApply={onSubmit}>
            <CustomDropDown name="discount" col={12} data={data} onChange={handleChange} options={allDiscountDropdown} />
        </CustomDialog>
    );
}
