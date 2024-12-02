import React, { useEffect, useState } from 'react';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import formValidation from '../../../../utils/validations';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomInputNumber, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import { useHistory, useParams } from 'react-router-dom';
import { getAgreementCategories } from '../../../../redux/actions/AgreementSettings/agreementCategories';
import { useDispatch, useSelector } from 'react-redux';
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
import useGetClubs from '../../../../hooks/useGetClubs';

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
        isOneTimePlan: true,
        assessedFee: [],
        services: [],
        autoPay: 'ON_SET_SCHEDULE',
        howOftenWillClientsBeCharged: '',
        timePeriod: 0,
        noOfAutopays: '',
        whenWillClientsBeCharged: '',
        date: '',
        whatHappensAfterAutopayPayments: '',
        sellOnline: '',
        onlineDescription: '',
        oneTimePlan: '',
        agreementPlans: [],
        isActive: true,
    });

    useEffect(() => {
        dispatch(getAgreementCategories());
        dispatch(getMembersipTypes());
        dispatch(getAssesedFees());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAgreementTemplates());
    }, [dispatch]);

    const allAssessedFeesDropdown = useSelector((state) => state.settings.agreement.assessedFeesDropdown);
    const { allAgreementTemplatesDropdown } = useSelector((state) => state.agreement);
    let { agreementCategoryDropdown, allAgreementCategories } = useSelector((state) => state.agreement);
    const [subcategoryOptions, setSubcategoryOptions] = useState([]);
    const MembershipTypesDropdown = useSelector((state) => state.settings.members.membershipTypesDropdown);
    const { clubsDropdown } = useGetClubs();

    const handleSave = () => {
        let ignore = ['services'];
        if (data?.whenWillClientsBeCharged !== 'SPECIFIC_DATE') {
            ignore = [...ignore, 'date'];
        }
        if (showFormErrors(data, setData, ignore)) {
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
                        howOftenWillClientsBeCharged: data.howOftenWillClientsBeCharged,
                        timePeriod: data.timePeriod,
                        noOfAutopays: data.noOfAutopays,
                        whenWillClientsBeCharged: data.whenWillClientsBeCharged,
                        date: data.date,
                        whatHappensAfterAutopayPayments: data.whatHappensAfterAutopayPayments,
                        sellOnline: data.sellOnline,
                        onlineDescription: data.onlineDescription,
                        oneTimePlan: data.oneTimePlan,
                        agreementPlans: data.agreementPlans,
                        isActive: data.isActive,
                    });
                    const subCategory =
                        allAgreementCategories
                            .find((category) => category._id === data.category)
                            ?.subCategories?.map((item) => ({ name: item, value: item })) || [];
                    setSubcategoryOptions(subCategory);
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        <CustomInputSwitch name="isActive" data={data} onChange={handleChange} />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title="Assessed Fees">
                    <CustomPickList name="assessedFee" selected={data?.assessedFee} sourceData={allAssessedFeesDropdown} onPickListChange={handleChange} />
                </CustomCard>
                <AddServices data={data} setData={setData} id={id} loading={loading} name="Add Services" />
                <CustomCard col="12" title="Contract Options">
                    <CustomGridLayout>
                        <CustomDropDown name="autoPay" options={autoPayOptions} onChange={handleChange} data={data} />
                        {data?.autoPay === 'ON_SET_SCHEDULE' && (
                            <CustomDropDown
                                name="howOftenWillClientsBeCharged"
                                label="How Often will Clients Be Charged"
                                options={oftenClientChargedOptions}
                                onChange={handleChange}
                                data={data}
                            />
                        )}
                        {data?.autoPay && <CustomInputNumber name="timePeriod" data={data} onChange={handleChange} col="4" suffix="Month" />}
                        {data?.howOftenWillClientsBeCharged === 'NO_OF_AUTOPAYS' && (
                            <CustomInput name="noOfAutopays" label="Number of AutoPays" data={data} onChange={handleChange} col="4" keyfilter="int" />
                        )}

                        {data?.autoPay === 'ON_SET_SCHEDULE' && (
                            <>
                                <CustomDropDown
                                    name="whenWillClientsBeCharged"
                                    label="When will Clients Be Charged"
                                    options={whenClientChargedOptions}
                                    onChange={handleChange}
                                    data={data}
                                />
                                {data?.whenWillClientsBeCharged === 'SPECIFIC_DATE' && <CustomCalenderInput name="date" data={data} onChange={handleChange} />}
                                {data?.howOftenWillClientsBeCharged === 'NO_OF_AUTOPAYS' && (
                                    <CustomDropDown
                                        name="whatHappensAfterAutopayPayments"
                                        label={` What happens after ${data?.noOfAutopays} payments`}
                                        options={afterSixPaymentsOptions}
                                        onChange={handleChange}
                                        data={data}
                                    />
                                )}
                            </>
                        )}

                        <>
                            <CustomDropDown name="sellOnline" options={yesNoOptions} onChange={handleChange} data={data} />
                            {data?.sellOnline && <CustomEditor name="onlineDescription" onTextChange={handleChange} data={data} />}
                        </>
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
