import React, { useEffect } from 'react';
import CustomCard, { CustomGridLayout } from '../../../shared/Cards/CustomCard';
import { CustomCheckbox, CustomDropDown } from '../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../shared/Button/CustomButton';
import { paymentMethodsOptions } from '../../../utils/dropdownConstants';
import CreditCardInput from '../../../shared/Payment/CreditCardInput';

const BillingInfoTab = ({ loading, onTabEnable, onCancel, payment, setPayment, onSubmit }) => {
    useEffect(() => {
        onTabEnable(4);
    }, []);

    const handleChange = ({ name, value }) => {
        setPayment((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = async () => {
        let opaqueData = await handleCreditCardSubmit();

        if (opaqueData) {
            onSubmit(opaqueData);
        }
    };

    const { CardInput, handleCreditCardSubmit, validations, handleCreditChange, data } = CreditCardInput();

    return (
        <>
            <CustomCard col="12" title="Membership Billing">
                <CustomGridLayout>
                    <CustomDropDown name="paymentMethodType" data={payment} options={paymentMethodsOptions} onChange={handleChange} />

                    {CardInput({ handleCreditChange, validations, data })}
                    <CustomCheckbox label="Enable Card on File" data={payment} name="enableCardOnFile" onChange={handleChange} col={12} />
                    <CustomCheckbox label="Use Payment Option from Club Account" data={payment} name="useClubAccount" onChange={handleChange} col={12} />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton loading={loading} label="Submit" className="mx-2" onClick={() => handleNext('')} />
                <LightButton label="Cancel" onClick={onCancel} />
            </CustomButtonGroup>
        </>
    );
};

export default BillingInfoTab;
