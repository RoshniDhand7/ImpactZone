import React, { useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomTextArea } from '../../shared/Input/AllInputs';
import { genderOptions } from '../../utils/dropdownConstants';

const AddMembers = () => {
    const [data, setData] = useState({});

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <CustomCard col="12" title="Membership">
                <CustomGridLayout>
                    <CustomInput name="createType" data={data} onChange={handleChange} required />
                    <CustomInput name="barCode" data={data} onChange={handleChange} required />
                    <CustomInput name="group" data={data} onChange={handleChange} required />
                    <CustomTextArea name="note" data={data} onChange={handleChange} required />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Personal">
                <CustomGridLayout>
                    <CustomInput name="firstName" data={data} onChange={handleChange} required />
                    <CustomInput name="lastName" data={data} onChange={handleChange} required />
                    <CustomInput name="group" data={data} onChange={handleChange} required />
                    <CustomDropDown name="gender" data={data} onChange={handleChange} required options={genderOptions} />
                    <CustomCalenderInput name="dob" data={data} onChange={handleChange} required />
                    <CustomInput name="driversLicense" data={data} onChange={handleChange} required />
                    <CustomInput name="primaryPhone" data={data} onChange={handleChange} required />
                    <CustomInput name="mobilePhone" data={data} onChange={handleChange} required />
                    <CustomInput name="workNumber" data={data} onChange={handleChange} required />
                    <CustomInput name="workExt" data={data} onChange={handleChange} required col="1" />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Address">
                <CustomGridLayout></CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Sale">
                <CustomGridLayout>
                    <CustomInput name="visitAllowed" data={data} onChange={handleChange} required col="1" />
                    <CustomDropDown name="leadPriority" data={data} onChange={handleChange} required options={[]} />
                    <CustomDropDown name="salesPerson" data={data} onChange={handleChange} required options={[]} />
                    <CustomDropDown name="compaign" data={data} onChange={handleChange} required options={[]} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Date">
                <CustomGridLayout>
                    <CustomCalenderInput name="issue" data={data} onChange={handleChange} required />
                    <CustomCalenderInput name="tour" data={data} onChange={handleChange} required options={[]} />
                    <CustomCalenderInput name="firstVisit" data={data} onChange={handleChange} required options={[]} />
                    <CustomCalenderInput name="begin" data={data} onChange={handleChange} required options={[]} />
                    <CustomCalenderInput name="expiration" data={data} onChange={handleChange} required />
                </CustomGridLayout>
            </CustomCard>
        </>
    );
};

export default AddMembers;
