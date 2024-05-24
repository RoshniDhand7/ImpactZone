import React, { useEffect, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomInputMask, CustomInputNumber, CustomTextArea } from '../../shared/Input/AllInputs';
import { LeadPriorityOptions, genderOptions, memberTypeOptions } from '../../utils/dropdownConstants';
import CustomImageInput from '../../shared/Input/CustomImageInput';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../redux/actions/EmployeeSettings/employeesAction';
import { getCampaigns } from '../../redux/actions/MembersSettings/campaigns';
import { setKey, setDefaults, setLanguage, setRegion, fromAddress, fromLatLng, fromPlaceId, setLocationType, geocode, RequestType } from 'react-geocode';
import { getMembershipPlans } from '../../redux/actions/AgreementSettings/membershipPlan';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';
import { showFormErrors } from '../../utils/commonFunctions';
import { useHistory } from 'react-router-dom';
import { addMembers } from '../../redux/actions/Dashboard/Members';
import formValidation from '../../utils/validations';

const AddMembers = () => {
    const [data, setData] = useState({
        createType: 'PROSPECT',
        barCode: 0,
        agreementPlan: '',
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
        lat: '',
        lng: '',
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
        compaign: '',
        latitude: 30.72,
        longitude: 76.64,
    });
    const dispatch = useDispatch();
    const history = useHistory();
    setDefaults({
        key: 'AIzaSyCVT1kEGwZJqYqoNE31as_MgMToUYhX0Js',
        language: 'en',
        region: 'es',
    });

    const address = fromAddress('Eiffel Tower')
        .then(({ results }) => {
            const { lat, lng } = results[0].geometry.location;
            console.log(lat, lng);
        })
        .catch(console.error);

    console.log(address, 'address');

    useEffect(() => {
        dispatch(getEmployees());
        dispatch(getCampaigns());
        dispatch(getMembershipPlans());
    }, [dispatch]);
    const { employeesDropdown } = useSelector((state) => state.employees);
    const { compaignDropdown } = useSelector((state) => state.campaign);
    let { allMembershipPlan } = useSelector((state) => state.membershipPlan);
    const loading = useSelector((state) => state.loader.isLoading);

    console.log(allMembershipPlan, 'all');

    const prospectAgreement = allMembershipPlan?.filter((item) => item.oneTimePlan === 'true')?.map((item) => ({ name: item.name, value: item._id }));
    const memberagreement = allMembershipPlan?.filter((item) => item.oneTimePlan === 'false')?.map((item) => ({ name: item.name, value: item._id }));

    const state = useSelector((state) => console.log(state));

    const [error, setError] = useState('');
    const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });

    const API_KEY = 'AIzaSyCtc8eeRCGEezJ1hWQYUiIslhMb7HOK9X0'; // Replace with your API key

    const getCoordinates = async () => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params: {
                    address: data?.address,
                    key: API_KEY,
                },
            });

            console.log('response>>', response);

            if (response.data.status === 'OK') {
                const location = response.data.results[0].geometry.location;
                setCoordinates({ lat: location.lat, lng: location.lng });
                setError('');
            } else {
                setError('Address not found');
            }
        } catch (err) {
            setError('Error fetching coordinates');
        }
    };

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    console.log('data>>', data);
    console.log('coordinates>>', coordinates);

    const handleSave = () => {
        if (showFormErrors(data, setData, ['workNumber'])) {
            dispatch(addMembers(data, () => history.goBack()));
        }
    };
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
                            name="agreementPlan"
                            data={data}
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
                    <CustomInput name="MI" data={data} onChange={handleChange} required col="2" />
                    <CustomInput name="lastName" data={data} onChange={handleChange} required col="3" />
                    <CustomDropDown name="gender" data={data} onChange={handleChange} options={genderOptions} />
                    <CustomCalenderInput name="dob" data={data} onChange={handleChange} required />
                    <CustomInput name="driverLicense" data={data} onChange={handleChange} required />
                    <CustomInputMask name="primaryPhone" mask="(999) 999-9999" data={data} onChange={handleChange} required />
                    <CustomInputMask name="mobilePhone" mask="(999) 999-9999" data={data} onChange={handleChange} />
                    <CustomInputMask name="workNumber" mask="(999) 999-9999" data={data} onChange={handleChange} />
                    <CustomInput name="workExt" data={data} onChange={handleChange} required col="1" />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Address">
                <CustomGridLayout>
                    <CustomInput name="address" data={data} onChange={handleChange} required />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Sale">
                <CustomGridLayout>
                    {data?.createType === 'PROSPECT' && (
                        <CustomDropDown name="leadpriority" data={data} onChange={handleChange} options={LeadPriorityOptions} />
                    )}
                    <CustomDropDown name="salesPerson" data={data} onChange={handleChange} required options={employeesDropdown} optionLabel="name" />
                    <CustomDropDown name="compaign" data={data} onChange={handleChange} required options={compaignDropdown} optionLabel="name" />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Date">
                <CustomGridLayout>
                    <CustomCalenderInput name="issue" data={data} onChange={handleChange} required />
                    {data?.createType === 'PROSPECT' && <CustomCalenderInput name="tour" data={data} onChange={handleChange} />}
                    <CustomCalenderInput name="firstVisit" data={data} onChange={handleChange} />
                    <CustomCalenderInput name="begin" data={data} onChange={handleChange} />
                    <CustomCalenderInput name="expiration" data={data} onChange={handleChange} />
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
