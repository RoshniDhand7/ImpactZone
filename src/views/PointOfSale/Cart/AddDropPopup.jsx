import { CustomDropDown, CustomInput, CustomInputNumber } from '../../../shared/Input/AllInputs';
import CustomDialog from '../../../shared/Overlays/CustomDialog';
import { addDropOptions } from '../../../utils/dropdownConstants';
import { useState } from 'react';
import { showFormErrors } from '../../../utils/commonFunctions';
import { addDropCheck } from '../../../redux/actions/POS/PosActions';
import { showToast } from '../../../redux/actions/toastAction';
import formValidation from '../../../utils/validations';

const AddDropPopup = ({ visible, setVisible }) => {
    const [data, setData] = useState({ discount: '', amount: '' });

    // useEffect(() => {
    //     dispatch(getDiscountTypes());
    // }, [dispatch]);

    const onClose = () => {
        setVisible(false);
        setData(initialData);
    };

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const onSubmit = () => {
        if (showFormErrors(data, setData)) {
            if (!drawer) {
                dispatch(showToast({ severity: 'error', summary: 'Please select a drawer to proceed further.' }));
                return;
            }
            data.cashRegister = drawer;
            dispatch(
                addDropCheck(data, setLoading, () => {
                    setVisible(false);
                    setData(initialData);
                }),
            );
        }
    };
    return (
        <CustomDialog title="Add/Drop" visible={visible} onCancel={onClose} onApply={onSubmit} loading={loading}>
            <CustomDropDown label="Select" name="paymentType" col={12} data={data} onChange={handleChange} options={addDropOptions} required />
            <CustomInputNumber name="amount" col={12} data={data} onChange={handleChange} required />
            <CustomInput label="Access Code" name="accessCode" col={12} data={data} onChange={handleChange} autoComplete="off" required />
        </CustomDialog>
    );
};

export default AddDropPopup;
