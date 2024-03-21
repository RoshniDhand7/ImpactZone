import React, { useState } from 'react';
import { CustomDropDown, CustomTextArea } from '../../../../shared/Input/AllInputs';
import { daysOptions, hoursOptions, yesNoOptions } from '../../../../utils/dropdownConstants';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import formValidation from '../../../../utils/validations';
import { useHistory } from 'react-router-dom';

const Online = () => {
    const [data, setData] = useState({});
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {};
    return (
        <>
            <CustomCard col="12" title="Allow Booking an Appointment">
                <CustomGridLayout>
                    <CustomDropDown options={hoursOptions} name="before" data={data} onChange={handleChange} />
                    <CustomDropDown options={daysOptions} name="until" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Cancellation">
                <CustomGridLayout>
                    <CustomDropDown options={yesNoOptions} name="allowCancelOnline" data={data} onChange={handleChange} />
                    <CustomDropDown options={hoursOptions} name="timeBeforeEvent" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Description">
                <CustomTextArea name="description" data={data} onChange={handleChange} />
            </CustomCard>
            <CustomCard col="12" title="Terms And Conditions">
                <CustomTextArea name="termsAndCondition" data={data} onChange={handleChange} />
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={() => handleSave('')} loading={loading} />
                <PrimaryButton label="Save & Next" className="mx-2" onClick={() => handleSave('?tab=categories')} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/schedule')} />
            </CustomButtonGroup>
        </>
    );
};

export default Online;
