import { useDispatch, useSelector } from 'react-redux';
import { CustomDropDown, CustomInput } from '../../../shared/Input/AllInputs';
import CustomDialog from '../../../shared/Overlays/CustomDialog';
import { useEffect, useState } from 'react';
import { showFormErrors } from '../../../utils/commonFunctions';
import formValidation from '../../../utils/validations';
import { addNoSale } from '../../../redux/actions/POS/saleActions';
import { getNoSaleReasons } from '../../../redux/actions/Settings/Business/reasonActions';

const NoSalePopup = ({ visible, setVisible }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const drawer = useSelector((state) => state.pos.drawer);
    const initialData = { reasonCode: '', accessCode: '' };
    const noSaleReasons = useSelector((state) => state.settings.business.noSaleReasons);

    const [data, setData] = useState(initialData);

    useEffect(() => {
        dispatch(getNoSaleReasons(setLoading));
    }, [dispatch]);

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
            data.cashRegister = drawer;
            dispatch(
                addNoSale(data, setLoading, () => {
                    setVisible(false);
                    setData(initialData);
                }),
            );
        }
    };
    return (
        <CustomDialog title="No Sale" visible={visible} onCancel={onClose} onApply={onSubmit} loading={loading}>
            <CustomDropDown
                label="Select Reason"
                name="reasonCode"
                col={12}
                data={data}
                onChange={handleChange}
                options={noSaleReasons}
                optionLabel="reasonCode"
                optionValue="_id"
                required
            />
            <CustomInput label="Access Code" name="accessCode" col={12} data={data} onChange={handleChange} autoComplete="off" required />
        </CustomDialog>
    );
};

export default NoSalePopup;
