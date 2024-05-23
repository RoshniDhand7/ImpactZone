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

const AddMembers = () => {
    const [data, setData] = useState({
        createType: 'PROSPECT',
        barCode: 0,
        agreementPlan: '',
        note: '',
        firstName: '',
        lastName: '',
        MI: '',
        gender: '',
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
    });
    const dispatch = useDispatch();
    setDefaults({
        key: 'AIzaSyCVT1kEGwZJqYqoNE31as_MgMToUYhX0Js', // Your API key here.
        language: 'en', // Default language for responses.
        region: 'es', // Default region for responses.
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
    }, [dispatch]);
    const { employeesDropdown } = useSelector((state) => state.employees);
    const { compaignDropdown } = useSelector((state) => state.campaign);

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
        setData((prev) => ({ ...prev, [name]: value }));
    };

    console.log('data>>', data);
    console.log('coordinates>>', coordinates);
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
                        <CustomDropDown col="4" name="agreementPlan" data={data} onChange={handleChange} required options={memberTypeOptions} />
                        {data?.createType === 'PROSPECT' && <CustomTextArea name="note" data={data} onChange={handleChange} required />}
                    </CustomGridLayout>
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="col-12" title="Personal">
                <CustomGridLayout>
                    <CustomInput name="firstName" data={data} onChange={handleChange} required col="3" />
                    <CustomInput name="MI" data={data} onChange={handleChange} required col="2" />
                    <CustomInput name="lastName" data={data} onChange={handleChange} required col="3" />
                    <CustomDropDown name="gender" data={data} onChange={handleChange} required options={genderOptions} />
                    <CustomCalenderInput name="dob" data={data} onChange={handleChange} required />
                    <CustomInput name="driverLicense" data={data} onChange={handleChange} required />
                    <CustomInputMask name="primaryPhone" mask="(999) 999-9999" data={data} onChange={handleChange} required />
                    <CustomInputMask name="mobilePhone" mask="(999) 999-9999" data={data} onChange={handleChange} required />
                    <CustomInputMask name="workNumber" mask="(999) 999-9999" data={data} onChange={handleChange} required />
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
                        <CustomDropDown name="leadpriority" data={data} onChange={handleChange} required options={LeadPriorityOptions} />
                    )}
                    <CustomDropDown name="salesPerson" data={data} onChange={handleChange} required options={employeesDropdown} optionLabel="name" />
                    <CustomDropDown name="compaign" data={data} onChange={handleChange} required options={compaignDropdown} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Date">
                <CustomGridLayout>
                    <CustomCalenderInput name="issue" data={data} onChange={handleChange} required />
                    {data?.createType === 'PROSPECT' && <CustomCalenderInput name="tour" data={data} onChange={handleChange} required />}
                    <CustomCalenderInput name="firstVisit" data={data} onChange={handleChange} required />
                    <CustomCalenderInput name="begin" data={data} onChange={handleChange} required />
                    <CustomCalenderInput name="expiration" data={data} onChange={handleChange} required />
                </CustomGridLayout>
            </CustomCard>
        </>
    );
};

export default AddMembers;
