import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CustomCard, { CustomGridLayout } from '../../../shared/Cards/CustomCard';
import { CustomCheckbox, CustomDropDown, CustomInput } from '../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../shared/Button/CustomButton';
import { paymentMethodsOptions } from '../../../utils/dropdownConstants';
import Cards from 'react-credit-cards-2';

const BillingInfoTab = ({ onTabEnable, onCancel, payment, setPayment }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        onTabEnable(4);
    }, []);

    const handleChange = ({ name, value }) => {
        setPayment((prev) => ({ ...prev, [name]: value, focused: name }));
    };

    const handleNext = () => {};

    return (
        <>
            <CustomCard col="12" title="Membership Billing">
                <CustomGridLayout>
                    <CustomDropDown name="paymentMethod" options={paymentMethodsOptions} />
                    <div className="col-12 grid">
                        <div className="col grid">
                            <CustomInput name="cardNumber" data={payment} onChange={handleChange} col={6} />
                            <CustomInput label="MM/YY" name="expiryDate" data={payment} onChange={handleChange} col={6} />
                            <CustomInput label="CVV" name="cvc" data={payment} onChange={handleChange} col={6} />
                            <CustomInput name="cardHolderName" data={payment} onChange={handleChange} col={6} />
                            <CustomCheckbox label="Enable Card on File" name="enable" col={12} />
                        </div>
                        <div className="col-4">
                            <Cards
                                number={payment.cardNumber}
                                expiry={payment.expiryDate}
                                cvc={payment.cvc}
                                name={payment.cardHolderName}
                                focused={payment.focused}
                            />
                        </div>
                    </div>

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
