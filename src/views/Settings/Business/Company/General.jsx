import React, { useState, useEffect } from 'react';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomDropDown, CustomInput, CustomInputMask } from '../../../../shared/Input/AllInputs';
import { checkInLimitOptions, perOptions, restrictionOptions, yesNoOptions } from '../../../../utils/dropdownConstants';
import { useDispatch } from 'react-redux';
import { getAllCountries, getCitiesByState, getStatesByCountry, showFormErrors } from '../../../../utils/commonFunctions';
import { useHistory } from 'react-router-dom';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import formValidation from '../../../../utils/validations';
import { editCompany } from '../../../../redux/actions/Settings/Business/companyActions';

const General = (company) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (company) {
            setData({
                companyId: company?._id,
                billingCountry: company?.billingCountry,
                companyName: company?.companyName,
                multiClubInOut: company?.multiClubInOut,
                clockInRequired: company?.clockInRequired,
                country: company?.country,
                address1: company?.address1,
                address2: company?.address2,
                city: company?.city,
                state: company?.state,
                zipCode: company?.zipCode,
                workNumber: company?.workNumber,
                workExtention: company?.workExtention,
                faxNumber: company?.faxNumber,
                primaryEmail: company?.primaryEmail,
                alternateEmail: company?.alternateEmail,
                companyUrl: company?.companyUrl,
                companyCode: company?.companyCode,
                batchId: company?.batchId,
                checkInLimit: company?.checkInLimit,
                per: company?.per,
                restrictionType: company?.restrictionType,
            });
            if (company?.country === 'US') {
                const cities = getCitiesByState(company.country, company.state);
                setCities(cities);
            }
        }
    }, [company]);

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
        setStates(updatedStates);
        setCountry(allCountryList);
    }, [dispatch]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);

        if (name === 'state') {
            const city = getCitiesByState('US', value);
            setCities(city);
            setData((prev) => ({ ...prev, [name]: value, city: '', formErrors }));
        } else {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
        }
    };

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            dispatch(editCompany(company._id, data, setLoading, history));
        }
    };

    return (
        <>
            <CustomCard col="12" title="General">
                <CustomGridLayout>
                    <CustomInput name="companyId" data={data} onChange={handleChange} disabled={true} required />
                    <CustomInput name="billingCountry" data={data} onChange={handleChange} required />
                    <CustomInput name="companyName" data={data} onChange={handleChange} required />
                    <CustomDropDown
                        label="Allow Multi-Club Clock In/Out"
                        name="multiClubInOut"
                        options={yesNoOptions}
                        data={data}
                        onChange={handleChange}
                        required
                    />
                    <CustomDropDown
                        label="Clock In Department Required"
                        name="clockInRequired"
                        options={yesNoOptions}
                        data={data}
                        onChange={handleChange}
                        required
                    />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Address">
                <CustomGridLayout>
                    <CustomDropDown name="country" options={country} data={data} disabled={true} required />
                    <CustomInput name="address1" data={data} onChange={handleChange} required />
                    <CustomInput name="address2" data={data} onChange={handleChange} required />
                    <CustomDropDown name="state" options={states} data={data} onChange={handleChange} required />
                    <CustomDropDown name="city" options={cities} data={data} onChange={handleChange} required />
                    <CustomInput name="zipCode" data={data} onChange={handleChange} required />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Contact Information">
                <CustomGridLayout>
                    <CustomInputMask name="workNumber" id="phone" mask="(999) 999-9999" data={data} placeholder="" onChange={handleChange} required />
                    <CustomInput name="workExtention" data={data} onChange={handleChange} />
                    <CustomInput name="faxNumber" data={data} onChange={handleChange} />
                    <CustomInput name="primaryEmail" data={data} onChange={handleChange} required />
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
                    <CustomDropDown name="per" options={perOptions} data={data} onChange={handleChange} disabled={data?.checkInLimit ? false : true} />
                    <CustomDropDown
                        name="restrictionType"
                        options={restrictionOptions}
                        data={data}
                        onChange={handleChange}
                        disabled={data?.per ? false : true}
                    />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/business')} />
            </CustomButtonGroup>
        </>
    );
};

export default General;
