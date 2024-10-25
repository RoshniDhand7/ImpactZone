import React, { useEffect, useMemo, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomInputMask, CustomInputNumber, CustomTextArea } from '../../shared/Input/AllInputs';
import { LeadPriorityOptions, genderOptions, memberTypeOptions } from '../../utils/dropdownConstants';
import CustomImageInput from '../../shared/Input/CustomImageInput';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../redux/actions/EmployeeSettings/employeesAction';
import { getCampaigns } from '../../redux/actions/MembersSettings/campaigns';
import { getDefaultMembershipPlan, getMembershipPlans } from '../../redux/actions/AgreementSettings/membershipPlan';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';
import debounce from 'lodash.debounce';
import { showFormErrors } from '../../utils/commonFunctions';
import { useHistory } from 'react-router-dom';
import { addMembers, getMembers } from '../../redux/actions/Dashboard/Members';
import formValidation from '../../utils/validations';
import usePlacesAutocomplete from './usePlacesAutoComplete';
import api from '../../services/api';
import endPoints from '../../services/endPoints';

const AddMembers = () => {
    const [data, setData] = useState({
        createType: 'PROSPECT',
        barCode: 0,
        memberShipPlan: '',
        note: '',
        firstName: '',
        lastName: '',
        MI: '',
        gender: 'MALE',
        dob: '',
        driverLicense: '',
        primaryPhone: '',
        mobilePhone: '',
        workNumber: '',
        address: '',
        leadpriority: '',
        salesPerson: '',
        campaign: '',
        issue: '',
        tour: '',
        firstVisit: '',
        begin: '',
        expiration: '',
        image: [],
        latitude: 30.72,
        longitude: 76.64,
        uniqueBarCode: false,
    });
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getEmployees());
        dispatch(getCampaigns());
        dispatch(getMembershipPlans());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            getDefaultMembershipPlan((data1) => {
                if (data1?.agreementPlan && data?.createType === 'PROSPECT') {
                    setData((prev) => ({ ...prev, memberShipPlan: data1.agreementPlan }));
                } else {
                    setData((prev) => ({ ...prev, memberShipPlan: '' }));
                }
            }),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.createType]);

    const { employeesDropdown } = useSelector((state) => state.employees);
    const { compaignDropdown } = useSelector((state) => state.campaign);
    let { allMembershipPlan } = useSelector((state) => state.membershipPlan);
    const loading = useSelector((state) => state.loader.isLoading);

    const prospectAgreement = allMembershipPlan?.filter((item) => item.oneTimePlan)?.map((item) => ({ name: item.name, value: item._id }));
    const memberagreement = allMembershipPlan?.filter((item) => !item.oneTimePlan)?.map((item) => ({ name: item.name, value: item._id }));

    // useEffect(() => {
    //     if (data.createType) {
    //         const formErrors = formValidation('memberShipPlan', '', data);
    //         setData((prev) => ({ ...prev, memberShipPlan: '', formErrors }));
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [data.createType]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);

        if (name === 'barCode') {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
            if (value) {
                debouncedChangeHandler(value);
            }
        } else {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
        }
    };

    const changeHandler = async (val) => {
        const res = await api('post', endPoints.MEMBER_BARCODE, { barCode: val });
        if (res.success) {
            setData((prev) => ({ ...prev, uniqueBarCode: false }));
        } else {
            setData((prev) => ({ ...prev, uniqueBarCode: true }));
        }
    };

    useEffect(() => {
        const formErrors = formValidation('barCode', data.uniqueBarCode, data);
        if (data?.uniqueBarCode) {
            formErrors['barCode'] = 'BarCode should be unique!';
        } else {
            formErrors['barCode'] = '';
        }
        setData((prev) => ({ ...prev, formErrors }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.uniqueBarCode]);

    const debouncedChangeHandler = useMemo(
        () =>
            debounce((val) => {
                changeHandler(val);
            }, 1000),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            dispatch(
                addMembers(data, () => {
                    history.goBack();
                    dispatch(getMembers());
                }),
            );
        }
    };
    const { renderAutocomplete } = usePlacesAutocomplete(data, setData);

    return (
        <>
            <h3>Fast Add</h3>
            <CustomCard col="12" title="Membership">
                <CustomGridLayout>
                    <div className="col-2">
                        <CustomImageInput name="image" data={data} onFilesChange={handleChange} required editable={true} />
                    </div>
                    <CustomGridLayout extraClass="col-10">
                        <CustomDropDown col="4" name="createType" data={data} onChange={handleChange} required options={memberTypeOptions} />
                        <CustomInputNumber col="4" name="barCode" data={data} onChange={handleChange} required />
                        <CustomDropDown
                            col="4"
                            name="memberShipPlan"
                            data={data}
                            required
                            onChange={handleChange}
                            options={data?.createType === 'PROSPECT' ? prospectAgreement : memberagreement}
                        />
                        {data?.createType === 'PROSPECT' && <CustomTextArea name="note" data={data} onChange={handleChange} />}
                    </CustomGridLayout>
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="col-12" title="Personal">
                <CustomGridLayout>
                    <CustomInput name="firstName" data={data} onChange={handleChange} required col="3" />
                    <CustomInput name="MI" data={data} onChange={handleChange} col="2" />
                    <CustomInput name="lastName" data={data} onChange={handleChange} required col="3" />
                    <CustomDropDown name="gender" data={data} onChange={handleChange} options={genderOptions} />
                    <CustomCalenderInput label="Date Of Birth" name="dob" data={data} onChange={handleChange} maxDate={new Date()} />
                    <CustomInput name="driverLicense" data={data} onChange={handleChange} required />
                    <CustomInputMask name="primaryPhone" mask="(999) 999-9999" data={data} onChange={handleChange} required />
                    <CustomInputMask name="mobilePhone" mask="(999) 999-9999" data={data} onChange={handleChange} />
                    <CustomInputMask name="workNumber" mask="(999) 999-9999" data={data} onChange={handleChange} required />
                    <CustomInput name="workExt" data={data} onChange={handleChange} col="1" />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Address">
                <CustomGridLayout>
                    <div className="md:col-6">
                        <label className="text-sm font-semibold">Address</label>
                        <span className="text-red-500">*</span>
                        {renderAutocomplete()}
                    </div>
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Sale">
                <CustomGridLayout>
                    {data?.createType === 'PROSPECT' && (
                        <CustomDropDown label="Lead Priority" name="leadpriority" data={data} onChange={handleChange} options={LeadPriorityOptions} />
                    )}
                    <CustomDropDown name="salesPerson" data={data} onChange={handleChange} required options={employeesDropdown} optionLabel="name" />
                    <CustomDropDown name="campaign" data={data} onChange={handleChange} required options={compaignDropdown} optionLabel="name" />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Date">
                <CustomGridLayout>
                    <CustomCalenderInput name="issue" data={data} onChange={handleChange} required />
                    {data?.createType === 'PROSPECT' && <CustomCalenderInput name="tour" data={data} onChange={handleChange} />}
                    <CustomCalenderInput name="firstVisit" data={data} onChange={handleChange} />
                    <CustomCalenderInput name="begin" required data={data} onChange={handleChange} maxDate={data.expiration} />
                    <CustomCalenderInput name="expiration" required data={data} onChange={handleChange} minDate={data.begin} />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.goBack()} />
            </CustomButtonGroup>
        </>
    );
};

export default AddMembers;
