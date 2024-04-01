import React, { useState, useEffect } from 'react';
import { BookingHours, hoursOptions, yesNoOptions } from '../../../../utils/dropdownConstants';
import { CustomDropDown, CustomTextArea } from '../../../../shared/Input/AllInputs';
import { useHistory, useParams } from 'react-router-dom';
import formValidation from '../../../../utils/validations';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { editScheduledEvent, getScheduledEvent } from '../../../../redux/actions/ScheduleSettings/eventsActions';
import { useDispatch } from 'react-redux';

const Notifications = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        eventNotification: '',
        timeBeforeEventReminder: '',
        message: '',
        cancelLink: '',
    });
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    useEffect(() => {
        if (id) {
            dispatch(
                getScheduledEvent(id, (data) => {
                    setData({
                        eventNotification: data.eventNotification,
                        timeBeforeEventReminder: data.timeBeforeEventReminder,
                        message: data.message,
                        cancelLink: data.cancelLink,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const handleSave = (tab) => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editScheduledEvent(id, data, setLoading, history, tab));
            }
        }
    };
    return (
        <>
            <CustomCard col="12" title="Event Reminders">
                <CustomGridLayout>
                    <CustomDropDown options={yesNoOptions} name="eventNotification" data={data} onChange={handleChange} />
                    <CustomDropDown options={BookingHours} name="timeBeforeEventReminder" data={data} onChange={handleChange} />
                    <CustomTextArea name="message" data={data} onChange={handleChange} maxLength={100} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Cancellation">
                <CustomGridLayout>
                    <CustomDropDown
                        options={yesNoOptions}
                        name="cancelLink"
                        label="Send cancellation link with reminder text"
                        data={data}
                        onChange={handleChange}
                    />
                </CustomGridLayout>
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={() => handleSave('')} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/schedule?tab=events-setups')} />
            </CustomButtonGroup>
        </>
    );
};

export default Notifications;
