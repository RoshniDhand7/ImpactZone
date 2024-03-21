import React, { useState, useEffect } from 'react';
import { yesNoOptions } from '../../../../utils/dropdownConstants';
import { CustomDropDown, CustomTextArea } from '../../../../shared/Input/AllInputs';
import { useHistory } from 'react-router-dom';
import formValidation from '../../../../utils/validations';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';

const Notifications = () => {
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
            <CustomCard col="12" title="Event Reminders">
                <CustomGridLayout>
                    <CustomDropDown options={yesNoOptions} name="sentEventNotifications" data={data} onChange={handleChange} />
                    <CustomDropDown options={yesNoOptions} name="timeBefore" data={data} onChange={handleChange} />
                    <CustomTextArea name="message" data={data} onChange={handleChange} maxLength={100} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Cancellation">
                <CustomGridLayout>
                    <CustomDropDown options={yesNoOptions} name="sendcancelLink" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={() => handleSave('')} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/schedule')} />
            </CustomButtonGroup>
        </>
    );
};

export default Notifications;
