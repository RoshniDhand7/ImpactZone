import { useDispatch, useSelector } from 'react-redux';
import CustomDialog from '../../../shared/Overlays/CustomDialog';
import { useEffect, useState } from 'react';
import formValidation from '../../../utils/validations';
import { getReasonsDetails } from '../../../redux/actions/BusinessSettings/reasonActions';
import CashCalculator from './Drawer/CashCalculator';
import PrimaryButton from '../../../shared/Button/CustomButton';

const QuickCashPopup = ({ visible, setVisible, cartDetails, onCheckout }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const drawer = useSelector((state) => state.pos.drawer);
    const initialData = { paymentType: '', accessCode: '' };
    const [data, setData] = useState(initialData);
    let { gradTotal } = cartDetails;
    gradTotal = (gradTotal || 0).toFixed(2);
    const totalCash = (data.totalCash || 0).toFixed(2);

    const returnMoney = totalCash - gradTotal;

    useEffect(() => {
        dispatch(getReasonsDetails());
    }, [dispatch]);

    const onClose = () => {
        setVisible(false);
        setData(initialData);
    };

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const checkoutHandler = () => {
        data.cashRegister = drawer;
        onCheckout({ method: 'CASH', printReceiept: false }, setLoading, () => {
            onClose();
        });
    };

    const onSubmit = () => {
        checkoutHandler();
    };

    return (
        <CustomDialog
            width="65vw"
            title="Quick Cash"
            applyLabel="Sale"
            visible={visible}
            onCancel={onClose}
            onApply={onSubmit}
            loading={loading}
            applydisabled={returnMoney < 0}
        >
            <CashCalculator onChange={handleChange} />
            <div className="mt-3 py-2 px-4 flex justify-content-between border-1 border-dashed">
                <div>{returnMoney === 0 && <PrimaryButton label="Exact Change" onClick={checkoutHandler} loading={loading} />}</div>
                <div className="">
                    <div className="flex gap-2">
                        <div className="text-dark-gray pe-2">Item Total:</div>
                        <div className="font-medium text-green-600">${gradTotal}</div>
                    </div>
                    <div className="flex gap-2">
                        <div className="text-dark-gray pe-2">Received:</div>
                        <div className="font-medium text-green-600">${totalCash}</div>
                    </div>
                    {returnMoney > 0 && (
                        <div className="flex gap-2">
                            <div className="text-dark-gray pe-2">Return:</div>
                            <div className="font-medium text-green-600">${returnMoney}</div>
                        </div>
                    )}
                </div>
            </div>
        </CustomDialog>
    );
};

export default QuickCashPopup;
