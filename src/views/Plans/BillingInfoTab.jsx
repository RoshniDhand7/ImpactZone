import React, { useEffect, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomCheckbox, CustomDropDown, CustomInput } from '../../shared/Input/AllInputs';
import formValidation from '../../utils/validations';
import { BlockUI } from 'primereact/blockui';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { getSellPlan } from '../../redux/actions/Plans/SellPlan';
import { useDispatch } from 'react-redux';

const BillingInfoTab = ({ onTabEnable }) => {
    const history = useHistory();
    const { id, newPlanId, memberId } = useParams();
    const dispatch = useDispatch();

    const [data, setData] = useState({
        enable: false,
        agreementTemplateId: '',
    });

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    useEffect(() => {
        if (id) {
            dispatch(
                getSellPlan(newPlanId, (data) => {
                    setData({
                        agreementTemplateId: data.agreementTemplate,
                    });
                }),
            );
        }
    }, [newPlanId, id, dispatch]);

    const handleNext = () => {
        onTabEnable(0, 1, 2, 3, 4, 5);
        history.replace(`/plans/plan-agreements/${newPlanId}/${memberId}/${data.agreementTemplateId}`);
    };

    return (
        <>
            <div className="bg-lightest-blue border-round p-2 mt-2 " style={{ overflowY: 'auto' }}>
                <CustomCheckbox label="Buyer’s Information (if not member)" name="buyersEnable" col="4" data={data} onChange={handleChange} />
            </div>
            <CustomCard col="12" title="Membership Billing">
                <CustomGridLayout>
                    <CustomInput name="firstName" required />
                    <CustomInput name="lastName" required />
                    <CustomDropDown name="paymentMethod" />
                    <CustomInput name="cardNumber" />
                    <CustomInput label="MM/YY" name="month" col="3" />
                    <CustomInput label="CVV" name="cvv" col="3" />
                    <CustomInput name="cardHolderName" />
                </CustomGridLayout>
            </CustomCard>
            <div className="grid">
                <CustomCard col="12" title="Card on File">
                    <CustomCheckbox label="Enable Card on File" name="enable" col="4" data={data} onChange={handleChange} />
                    <BlockUI blocked={!data.enable} className="mt-2">
                        <CustomGridLayout>
                            <CustomCheckbox
                                label=" Use Payment Option from Club Account"
                                name="usePaymentOption"
                                data={data}
                                onChange={handleChange}
                                col="12"
                                extraClassName="mt-4"
                            />
                            <CustomDropDown name="paymentMethod" required />
                            <CustomInput name="cardNumber" required />
                            <CustomInput label="MM/YY" name="month" col="3" />
                            <CustomInput label="CVV" name="cvv" col="3" />
                            <CustomInput name="cardHolderName" />
                        </CustomGridLayout>
                    </BlockUI>
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Next" className="mx-2" onClick={handleNext} />
                    <PrimaryButton label="Save & Hold" className="mx-2" />
                    <PrimaryButton label="Sign Agreement" className="mx-2" />
                    <LightButton label="Cancel" />
                </CustomButtonGroup>
            </div>
        </>
    );
};

export default BillingInfoTab;
