import React, { useEffect, useState } from 'react';
import { CustomDropDown, CustomTextArea } from '../../../../shared/Input/AllInputs';
import { daysOptions, hoursOptions, yesNoOptions } from '../../../../utils/dropdownConstants';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import formValidation from '../../../../utils/validations';
import { useHistory, useParams } from 'react-router-dom';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { useDispatch } from 'react-redux';
import { editScheduledEvent, getScheduledEvent } from '../../../../redux/actions/ScheduleSettings/eventsActions';

const Online = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        appointmentAtLeast: '',
        appointmentFuture: '',
        cancelOnline: '',
        timeBeforeEvent: '',
        description: '',
        termAndCondition: '',
    });

    useEffect(() => {
        if (id) {
            dispatch(
                getScheduledEvent(id, (data) => {
                    setData({
                        appointmentAtLeast: data.appointmentAtLeast,
                        appointmentFuture: data.appointmentFuture,
                        cancelOnline: data.cancelOnline,
                        timeBeforeEvent: data.timeBeforeEvent,
                        description: data.description,
                        termAndCondition: data.termAndCondition,
                    });
                }),
            );
        }
    }, [id, dispatch]);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = (tab) => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(editScheduledEvent(id, data, setLoading, history, tab));
            }
        }
    };
    return (
        <>
            <CustomCard col="12" title="Allow Booking an Appointment">
                <CustomGridLayout>
                    <CustomDropDown options={hoursOptions} name="appointmentAtLeast" data={data} onChange={handleChange} />
                    <CustomDropDown options={daysOptions} name="appointmentFuture" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Cancellation">
                <CustomGridLayout>
                    <CustomDropDown options={yesNoOptions} name="cancelOnline" data={data} onChange={handleChange} />
                    <CustomDropDown options={hoursOptions} name="timeBeforeEvent" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Description">
                <CustomTextArea name="description" data={data} onChange={handleChange} />
            </CustomCard>
            <CustomCard col="12" title="Terms And Conditions">
                <CustomTextArea name="termAndCondition" data={data} onChange={handleChange} />
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={() => handleSave('')} loading={loading} />
                <PrimaryButton label="Save & Next" className="mx-2" onClick={() => handleSave('?tab=notifications')} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/schedule')} />
            </CustomButtonGroup>
        </>
    );
};

export default Online;
