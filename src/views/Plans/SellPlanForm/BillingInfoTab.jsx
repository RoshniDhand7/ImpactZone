import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CustomCard, { CustomGridLayout } from '../../../shared/Cards/CustomCard';
import { CustomCheckbox, CustomDropDown, CustomInput, CustomInputMask } from '../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../shared/Button/CustomButton';
import { paymentMethodsOptions } from '../../../utils/dropdownConstants';
import Cards from 'react-credit-cards-2';
import CreditCardInput from '../../../shared/Payment/CreditCardInput';

const BillingInfoTab = ({ onTabEnable, onCancel, payment, setPayment }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        onTabEnable(4);
    }, []);

    const handleChange = ({ name, value }) => {
        setPayment((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {};

    return (
        <>
            <CustomCard col="12" title="Membership Billing">
                <CustomGridLayout>
                    <CustomDropDown name="paymentMethod" data={payment} options={paymentMethodsOptions} onChange={handleChange} />
                    <CreditCardInput onChange={handleChange} />
                    <CustomCheckbox label="Enable Card on File" name="enable" col={12} />
                    <CustomCheckbox label="Use Payment Option from Club Account" name="usePaymentOption" onChange={handleChange} col={12} />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Submit" className="mx-2" onClick={() => handleNext('')} />
                <LightButton label="Cancel" onClick={onCancel} />
            </CustomButtonGroup>
        </>
    );
};

export default BillingInfoTab;
