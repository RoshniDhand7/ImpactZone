import React, { useState, useEffect, useCallback } from 'react';
import CustomTabView from '../../../../shared/TabView/CustomTabView';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput } from '../../../../shared/Input/AllInputs';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { checkInLimitOptions, perOptions, restrictionOptions, yesNoOptions } from '../../../../utils/dropdownConstants';
import { useDispatch } from 'react-redux';
import { getAllCountries, getCitiesByState, getStatesByCountry } from '../../../../utils/commonFunctions';
import { InputText } from 'primereact/inputtext';

export default function CompanyForm({ history }) {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        companyId: '',
        billingCountry: '',
        companyName: '',
        multiclubInOut: '',
        clockInDepartment: '',
        country: 'US',
        address1: '',
        address2: '',
        state: '',
        city: '',
        zipCode: '',
        workNumber: '',
        workExtention: '',
        faxNumber: '',
        primaryEmail: '',
        alternateEmail: '',
        companyUrl: '',
        companyCode: '',
        batchId: '',
        checkInLimit: '',
        per: '',
        restrictionType: '',
    });
    const [country, setCountry] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    useEffect(() => {
        const allCountryList = getAllCountries();
        const updatedStates = getStatesByCountry('US');
        console.log('states>>', allCountryList);
        setStates(updatedStates);
        setCountry(allCountryList);
    }, [dispatch]);
    const handleChange = ({ name, value }) => {
        if (name === 'state') {
            const city = getCitiesByState('US', value);
            console.log('city>>', city);
            setCities(city);
            setData((prev) => ({ ...prev, [name]: value, city: '' }));
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    };
    const [value, setValue] = useState('');

    console.log('data>>', data);
    const General = () => {
        return (
            <>
                <CustomCard col="12" title="General">
                    <CustomGridLayout>
                        <CustomInput name="companyId" data={data} onChange={handleChange} />
                        <CustomInput name="billingCountry" data={data} onChange={handleChange} />
                        <CustomInput name="companyName" data={data} onChange={handleChange} />
                        <CustomDropDown label="Allow Multi-Club Clock In/Out" name="" options={yesNoOptions} data={data} onChange={handleChange} />
                        <CustomDropDown label="Clock In Department Required" name="inOut" options={yesNoOptions} data={data} onChange={handleChange} />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title="Address">
                    <CustomGridLayout>
                        <CustomDropDown name="country" options={country} data={data} disabled={true} />
                        <CustomInput name="address1" data={data} onChange={handleChange} />
                        <CustomInput name="address2" data={data} onChange={handleChange} />
                        <CustomDropDown name="state" options={states} data={data} onChange={handleChange} />
                        <CustomDropDown name="city" options={cities} data={data} onChange={handleChange} />
                        <CustomInput name="zipCode" data={data} onChange={handleChange} />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title="Contact Information">
                    <CustomGridLayout>
                        <CustomInput name="workNumber" data={data} onChange={handleChange} />
                        <CustomInput name="workExtention" data={data} onChange={handleChange} />
                        <CustomInput name="faxNumber" data={data} onChange={handleChange} />
                        <CustomInput name="primaryEmail" data={data} onChange={handleChange} />
                        <CustomInput name="alternateEmail" data={data} onChange={handleChange} />
                        <CustomInput name="companyUrl" data={data} onChange={handleChange} />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title="Data Export">
                    <CustomGridLayout>
                        <CustomInput name="companyCode" data={data} onChange={handleChange} />
                        <CustomInput name="batchId" data={data} onChange={handleChange} />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title="Remote Check Ins">
                    <CustomGridLayout>
                        <CustomDropDown name="checkInLimit" options={checkInLimitOptions} data={data} onChange={handleChange} />
                        <CustomDropDown name="per" options={perOptions} data={data} onChange={handleChange} />
                        <CustomDropDown name="restrictionType" options={restrictionOptions} data={data} onChange={handleChange} />
                    </CustomGridLayout>
                </CustomCard>
            </>
        );
    };

    const Online = () => {
        return (
            <>
                <CustomCard col="12" title="Booking">
                    <CustomGridLayout>
                        <CustomInput name="bookOutFrom" />
                        <CustomInput name="bookOutTo" />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard col="12" title="Cancellation">
                    <CustomGridLayout>
                        <CustomInput name="allowCancelOnline" />
                        <CustomInput name="timeBeforeEvent" />
                    </CustomGridLayout>
                </CustomCard>
            </>
        );
    };

    const tabs = [
        { title: 'General', content: General() },
        { title: 'Online', content: Online() },
    ];

    return (
        <FormPage backText="Company" backTo="/settings/business?tab=company">
            <CustomTabView tabs={tabs} />
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/business')} />
            </CustomButtonGroup>
        </FormPage>
    );
}
