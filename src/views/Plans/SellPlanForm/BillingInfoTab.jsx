import React, { useEffect, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../../shared/Cards/CustomCard';
import { CustomCheckbox, CustomDropDown } from '../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../shared/Button/CustomButton';
import { paymentMethodsOptions } from '../../../utils/dropdownConstants';
import CreditCardInput from '../../../shared/Payment/CreditCardInput';

const BillingInfoTab = ({ setLoading, memberInfo, loading, onTabEnable, onCancel, payment, setPayment, onSubmit }) => {
    useEffect(() => {
        onTabEnable(4);
    }, []);

    const handleChange = ({ name, value }) => {
        setPayment((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = async () => {
        setLoading(true);
        let opaqueData = await handleCreditCardSubmit();
        let opaqueDataValidation = await handleCreditCardSubmit();

        if (opaqueData) {
            onSubmit({ opaqueData, opaqueDataValidation, cardHolderName: data.cardHolderName });
        }
    };

    const { CardInput, handleCreditCardSubmit, validations, handleCreditChange, data } = CreditCardInput();
    console.log('data==>', data);

    const [selectedCard, setSeletedCard] = useState(null);

    const onSelectCard = (id) => {
        setSeletedCard((prev) => {
            if (prev === id) {
                return null;
            } else {
                return id;
            }
        });
    };
    return (
        <>
            <CustomCard col="12" title="Membership Billing">
                <CustomGridLayout>
                    <CustomDropDown name="paymentMethodType" data={payment} options={paymentMethodsOptions} onChange={handleChange} />

                    {CardInput({ handleCreditChange, validations, data })}
                    <CustomCheckbox label="Enable Card on File" data={payment} name="enableCardOnFile" onChange={handleChange} col={12} />
                    <CustomCheckbox
                        extraClassName="mb-2"
                        label="Use Payment Option from Club Account"
                        data={payment}
                        name="useClubAccount"
                        onChange={handleChange}
                        col={12}
                    />
                    <br />
                    {memberInfo?.customerPaymentProfiles?.length > 0 &&
                        memberInfo?.customerPaymentProfiles.map((item, i) => (
                            <div
                                class={`saved-cards mr-3 ${item.customerPaymentProfileId === selectedCard ? 'selected' : ''}`}
                                onClick={() => onSelectCard(item.customerPaymentProfileId)}
                            >
                                <div class="card-details">
                                    <span>
                                        <span>
                                            <strong>{item?.payment?.creditCard?.cardNumber}</strong>
                                        </span>
                                        <strong>
                                            {item?.billTo?.firstName} {item?.billTo?.lastName}
                                        </strong>
                                    </span>
                                </div>
                                <div class="card-type">{item?.payment?.creditCard?.cardType}</div>
                            </div>
                        ))}
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
