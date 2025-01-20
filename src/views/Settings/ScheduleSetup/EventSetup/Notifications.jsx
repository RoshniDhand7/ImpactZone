import React, { useState, useEffect } from 'react';
import { BookingHours, yesNoOptions } from '../../../../utils/dropdownConstants';
import { CustomDropDown, CustomTextArea } from '../../../../shared/Input/AllInputs';
import { useHistory, useParams } from 'react-router-dom';
import formValidation from '../../../../utils/validations';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { editScheduledEvent, getScheduledEvent } from '../../../../redux/actions/Settings/ScheduleSetup/eventsActions';
import { useDispatch } from 'react-redux';

const Notifications = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        eventNotification: '',
        timeBeforeEventReminder: { data: '', type: '' },
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
                        timeBeforeEventReminder: {
                            name: `${data?.timeBeforeEventReminder?.value} ${data?.timeBeforeEventReminder?.type?.toLowerCase()}`,
                            data: data?.timeBeforeEventReminder?.value,
                            type: data?.timeBeforeEventReminder?.type,
                        },
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
                dispatch(
                    editScheduledEvent(
                        id,
                        { ...data, timeBeforeEventReminder: { value: data?.timeBeforeEventReminder?.data, type: data?.timeBeforeEventReminder?.type } },
                        setLoading,
                        history,
                        tab,
                    ),
                );
            }
        }
    };
    return (
        <>
            <CustomCard col="12" title="Event Reminders">
                <CustomGridLayout>
                    <CustomDropDown options={yesNoOptions} name="eventNotification" data={data} onChange={handleChange} />
                    <CustomDropDown
                        options={BookingHours?.map((cat, i) => {
                            return { name: cat.name, data: cat.value, type: cat.type };
                        })}
                        name="timeBeforeEventReminder"
                        data={data}
                        onChange={handleChange}
                    />
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
