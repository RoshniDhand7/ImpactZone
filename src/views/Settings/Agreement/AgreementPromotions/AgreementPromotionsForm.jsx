import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMembershipPlans } from '../../../../redux/actions/AgreementSettings/membershipPlan';
import { PromotionTypeOptions, amountTypeOptions } from '../../../../utils/dropdownConstants';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomInputNumber, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import formValidation from '../../../../utils/validations';
import { useHistory, useParams } from 'react-router-dom';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { addAgreementPromotion, editAgreementPromotion, getAgreementPromotion } from '../../../../redux/actions/AgreementSettings/agreementPromotions';

const AgreementPromotionsForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(getMembershipPlans());
    }, [dispatch]);
    const { allMembershipPlanDropdown } = useSelector((state) => state.membershipPlan);
    const { id } = useParams();
    const loading = useSelector((state) => state?.loader?.isLoading);
    const [data, setData] = useState({
        code: '',
        name: '',
        membershipPlan: null,
        startDate: '',
        endDate: '',
        uses: 0,
        promotionType: '',
        amount: 0,
        amountType: '',
        isActive: true,
    });
    useEffect(() => {
        if (id) {
            dispatch(
                getAgreementPromotion(id, (data) => {
                    setData({
                        code: data.code,
                        name: data.name,
                        membershipPlan: data.membershipPlan,
                        startDate: data.startDate ? new Date(data.startDate) : '',
                        endDate: data.endDate ? new Date(data.endDate) : '',
                        uses: data.uses,
                        promotionType: data.promotionType,
                        amount: data.amount,
                        amountType: data.amountType,
                        isActive: data.isActive,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editAgreementPromotion(id, data, history));
            } else {
                dispatch(addAgreementPromotion(data, history));
            }
        }
    };

    return (
        <>
            <FormPage backText="Agreement Promotions">
                <CustomCard col="12" title="Add Agreement Promotions">
                    <CustomGridLayout>
                        <CustomInput name="code" data={data} onChange={handleChange} />
                        <CustomInput name="name" data={data} onChange={handleChange} required />
                        <CustomDropDown name="membershipPlan" options={allMembershipPlanDropdown} onChange={handleChange} data={data} />
                        <CustomCalenderInput name="startDate" data={data} onChange={handleChange} />
                        <CustomCalenderInput name="endDate" data={data} onChange={handleChange} />
                        <CustomInputNumber name="uses" data={data} onChange={handleChange} col="4" />
                        <CustomDropDown name="promotionType" options={PromotionTypeOptions} onChange={handleChange} data={data} />
                        <CustomInputNumber name="amount" data={data} onChange={handleChange} />
                        <CustomDropDown label="" name="amountType" options={amountTypeOptions} data={data} onChange={handleChange} col={1} />
                        <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                    </CustomGridLayout>
                </CustomCard>

                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default AgreementPromotionsForm;
