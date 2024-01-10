import React, { useState, useEffect } from 'react';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput } from '../../../../shared/Input/AllInputs';
import { checkInLimitOptions, perOptions, restrictionOptions, yesNoOptions } from '../../../../utils/dropdownConstants';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries, getCitiesByState, getStatesByCountry } from '../../../../utils/commonFunctions';
import { editCompany, getCompanyDetails } from '../../../../redux/actions/BusinessSettings/companyActions';
import { useHistory } from 'react-router-dom';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';

const General = (allCompany) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (allCompany) {
            setData({
                companyId: allCompany?.companyId,
                billingCountry: allCompany?.billingCountry,
                companyName: allCompany?.companyName,
                multiClubInOut: false,
                clockInRequired: false,
                country: allCompany?.country,
                address1: allCompany?.address1,
                address2: allCompany?.address2,
                city: allCompany?.city,
                state: allCompany?.state,
                zipCode: allCompany?.zipCode,
                workNumber: allCompany?.workNumber,
                workExtention: allCompany?.workExtention,
                faxNumber: allCompany?.faxNumber,
                primaryEmail: allCompany?.primaryEmail,
                alternateEmail: allCompany?.alternateEmail,
                companyUrl: allCompany?.companyUrl,
                companyCode: allCompany?.companyCode,
                batchId: allCompany?.batchId,
                checkInLimit: allCompany?.checkInLimit,
                per: allCompany?.per,
                restrictionType: allCompany?.restrictionType,
            });
            if (allCompany?.country === 'US') {
                const cities = getCitiesByState(allCompany.country, allCompany.state);
                setCities(cities);
            }
        }
    }, [allCompany]);

    const [data, setData] = useState({
        companyId: '',
        billingCountry: '',
        companyName: '',
        multiClubInOut: false,
        clockInRequired: false,
        country: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
        workNumber: '',
        workExtention: '',
        faxNumber: '',
        primaryEmail: '',
        alternateEmail: '',
        companyUrl: '',
        companyCode: '',
        batchId: '',
        checkInLimit: 'No Limit',
        per: 'Week (7 Days)',
        restrictionType: 'Company',
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

    const handleSave = () => {
        dispatch(editCompany(data, setLoading, history));
    };

    console.log('data>>', data);
    return (
        <>
            <CustomCard col="12" title="General">
                <CustomGridLayout>
                    <CustomInput name="companyId" data={data} onChange={handleChange} />
                    <CustomInput name="billingCountry" data={data} onChange={handleChange} />
                    <CustomInput name="companyName" data={data} onChange={handleChange} />
                    <CustomDropDown label="Allow Multi-Club Clock In/Out" name="multiClubInOut" options={yesNoOptions} data={data} onChange={handleChange} />
                    <CustomDropDown label="Clock In Department Required" name="clockInRequired" options={yesNoOptions} data={data} onChange={handleChange} />
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
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={handleSave} />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/business')} />
            </CustomButtonGroup>
        </>
    );
};

export default General;
