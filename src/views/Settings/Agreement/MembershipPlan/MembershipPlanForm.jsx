import React, { useEffect, useState } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import formValidation from '../../../../utils/validations';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomInputNumber } from '../../../../shared/Input/AllInputs';
import { useHistory, useParams } from 'react-router-dom';
import { getAgreementCategories } from '../../../../redux/actions/AgreementSettings/agreementCategories';
import { useDispatch, useSelector } from 'react-redux';
import { getClubs } from '../../../../redux/actions/BusinessSettings/clubsAction';
import { getMembersipTypes } from '../../../../redux/actions/MembersSettings/membershipTypes';
import {
    afterSixPaymentsOptions,
    autoPayOptions,
    oftenClientChargedOptions,
    whenClientChargedOptions,
    yesNoOptions,
} from '../../../../utils/dropdownConstants';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { getAgreementTemplates } from '../../../../redux/actions/AgreementSettings/AgreementTemplate';
import CustomPickList from '../../../../shared/Input/CustomPickList';
import { getAssesedFees } from '../../../../redux/actions/AgreementSettings/assessedFees';
import AddServices from '../../Inventory/CatalogItems/AddServices';
import CustomEditor from '../../../../shared/Input/CustomEditor';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { addMembershipPlan, editMembershipPlan, getMembershipPlan } from '../../../../redux/actions/AgreementSettings/membershipPlan';
import AddAgreementPlan from './AddAgreementPlan';

const MembershipPlanForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const loading = useSelector((state) => state.loader.isLoading);
    const [data, setData] = useState({
        category: '',
        subCategory: '',
        club: '',
        name: '',
        membershipType: '',
        agreementTemplate: '',
        assessedFee: [],
        services: [],
        autoPay: '',
        oftenClientCharged: '',
        timePeriod: 0,
        noOfAutopays: '',
        whenClientCharged: '',
        date: '',
        afterSixPayments: '',
        sellOnline: '',
        onlineDescription: '',
        oneTimePlan: '',
        membershipPlan: [],
    });

    useEffect(() => {
        dispatch(getAgreementCategories());
        dispatch(getClubs());
        dispatch(getMembersipTypes());
        dispatch(getAssesedFees());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAgreementTemplates());
        localStorage.removeItem('gjsProject');
    }, [dispatch]);

    const { allAssessedFeesDropdown } = useSelector((state) => state.assessedFees);
    const { allAgreementTemplatesDropdown } = useSelector((state) => state.agreement);
    let { agreementCategoryDropdown, allAgreementCategories } = useSelector((state) => state.agreement);
    const [subcategoryOptions, setSubcategoryOptions] = useState([]);
    const { clubsDropdown } = useSelector((state) => state.clubs);
    const { MembershipTypesDropdown } = useSelector((state) => state.membershipTypes);
    const handleSave = () => {
        if (showFormErrors(data, setData, ['services'])) {
            if (id) {
                dispatch(editMembershipPlan(id, data, history));
            } else {
                dispatch(addMembershipPlan(data, history));
            }
        }
    };
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        if (name === 'category') {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
            const subCategory =
                allAgreementCategories.find((category) => category._id === value)?.subCategories?.map((item) => ({ name: item, value: item })) || [];
            setSubcategoryOptions(subCategory);
        }
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    useEffect(() => {
        if (id) {
            dispatch(
                getMembershipPlan(id, null, (data) => {
                    setData({
                        category: data.category,
                        subCategory: data.subCategory,
                        club: data.club,
                        name: data.name,
                        membershipType: data?.membershipType?._id,
                        agreementTemplate: data.agreementTemplate,
                        assessedFee: data?.assessedFee?.id,
                        services: data.services,
                        autoPay: data.autoPay,
                        oftenClientCharged: data.oftenClientCharged,
                        timePeriod: data.timePeriod,
                        noOfAutopays: data.noOfAutopays,
                        whenClientCharged: data.whenClientCharged,
                        date: data.date,
                        afterSixPayments: data.afterSixPayments,
                        sellOnline: data.sellOnline,
                        onlineDescription: data.onlineDescription,
                        oneTimePlan: data.oneTimePlan,
                        membershipPlan: data.membershipPlan,
                    });
                    const subCategory =
                        allAgreementCategories
                            .find((category) => category._id === data.category)
                            ?.subCategories?.map((item) => ({ name: item, value: item })) || [];
                    setSubcategoryOptions(subCategory);
                }),
            );
        }
    }, [id, dispatch]);

    return (
        <>
            <FormPage backText="Agreement Plan">
                <CustomCard col="12" title="General">
                    <CustomGridLayout>
                        <CustomDropDown name="category" options={agreementCategoryDropdown} onChange={handleChange} data={data} required />
                        <CustomDropDown name="subCategory" options={subcategoryOptions} onChange={handleChange} data={data} required />
                        <CustomInput name="name" data={data} onChange={handleChange} required />
                        <CustomDropDown name="club" options={clubsDropdown} onChange={handleChange} data={data} required />
                        <CustomDropDown name="membershipType" options={MembershipTypesDropdown} onChange={handleChange} data={data} required />
                        <CustomDropDown name="agreementTemplate" options={allAgreementTemplatesDropdown} onChange={handleChange} data={data} />
                        <CustomDropDown label="Is this a one time plan ?" name="oneTimePlan" options={yesNoOptions} onChange={handleChange} data={data} />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title="Assessed Fees">
                    <CustomPickList name="assessedFee" selected={data?.assessedFee} sourceData={allAssessedFeesDropdown} onPickListChange={handleChange} />
                </CustomCard>
                <AddServices data={data} setData={setData} id={id} loading={loading} name="Add Services" />
                <CustomCard col="12" title="Contract Options">
                    <CustomGridLayout>
                        <CustomDropDown name="autoPay" options={autoPayOptions} onChange={handleChange} data={data} />
                        {data?.autoPay === 'set_schedule' && (
                            <CustomDropDown
                                name="oftenClientCharged"
                                label="How Often will Clients Be Charged"
                                options={oftenClientChargedOptions}
                                onChange={handleChange}
                                data={data}
                            />
                        )}
                        {data?.autoPay && <CustomInputNumber name="timePeriod" data={data} onChange={handleChange} col="4" suffix="Month" />}
                        {data?.oftenClientCharged === 'no_of_autopays' && (
                            <CustomInput name="noOfAutopays" label="Number of AutoPays" data={data} onChange={handleChange} col="4" keyfilter="int" />
                        )}

                        {data?.autoPay === 'set_schedule' && (
                            <>
                                <CustomDropDown
                                    name="whenClientCharged"
                                    label="When will Clients Be Charged"
                                    options={whenClientChargedOptions}
                                    onChange={handleChange}
                                    data={data}
                                />
                                {data?.whenClientCharged === 'specific_date' && <CustomCalenderInput name="date" data={data} onChange={handleChange} />}
                                {data?.oftenClientCharged === 'no_of_autopays' && (
                                    <CustomDropDown
                                        name="afterSixPayments"
                                        label={` What happens after ${data?.noOfAutopays} payments`}
                                        options={afterSixPaymentsOptions}
                                        onChange={handleChange}
                                        data={data}
                                    />
                                )}
                            </>
                        )}
                        {(data?.autoPay === 'pricing_options_run_out' || data?.autoPay === 'set_schedule') && (
                            <>
                                <CustomDropDown name="sellOnline" options={yesNoOptions} onChange={handleChange} data={data} />
                                {data?.sellOnline === 'true' && <CustomEditor name="onlineDescription" onTextChange={handleChange} data={data} />}
                            </>
                        )}
                    </CustomGridLayout>
                </CustomCard>
                <AddAgreementPlan data={data} setData={setData} id={id} loading={loading} type="discount" />

                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default MembershipPlanForm;
