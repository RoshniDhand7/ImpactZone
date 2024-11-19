import { useDispatch } from 'react-redux';
import { CustomDropDown, CustomInput, CustomInputNumber } from '../../../shared/Input/AllInputs';
import CustomDialog from '../../../shared/Overlays/CustomDialog';
import { addDropOptions } from '../../../utils/dropdownConstants';
import { useEffect, useState } from 'react';
import { showFormErrors } from '../../../utils/commonFunctions';

const AddDropPopup = ({ visible, setVisible }) => {
    const dispatch = useDispatch();

    const [data, setData] = useState({ discount: '', amount: '' });

    // useEffect(() => {
    //     dispatch(getDiscountTypes());
    // }, [dispatch]);

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
        if (showFormErrors(data, setData)) {
            console.log('show form errors');
        }
    };
    return (
        <CustomDialog title="Add/Drop" visible={visible} onCancel={onClose} onApply={onSubmit}>
            <CustomDropDown label="Select" name="discount" col={12} data={data} onChange={handleChange} options={addDropOptions} required />
            <CustomInputNumber name="amount" col={12} data={data} onChange={handleChange} required />
            <CustomInput label="Access Code" name="accessCode" col={12} data={data} onChange={handleChange} autocomplete="off" required />
        </CustomDialog>
    );
};

export default AddDropPopup;
