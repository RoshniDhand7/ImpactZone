import React, { useEffect, useState } from 'react';
import { CustomDropDown, CustomTextArea } from '../../../../shared/Input/AllInputs';
import { BookingHours, yesNoOptions } from '../../../../utils/dropdownConstants';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import formValidation from '../../../../utils/validations';
import { useHistory, useParams } from 'react-router-dom';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { useDispatch } from 'react-redux';
import { editScheduledEvent, getScheduledEvent } from '../../../../redux/actions/Settings/ScheduleSetup/eventsActions';

const Online = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        appointmentAtLeast: { data: '', type: '' },
        appointmentUntil: { data: '', type: '' },
        cancelOnline: '',
        timeBeforeEvent: { data: '', type: '' },
        description: '',
        termAndCondition: '',
    });

    useEffect(() => {
        if (id) {
            dispatch(
                getScheduledEvent(id, (data) => {
                    setData({
                        appointmentAtLeast: data.appointmentAtLeast
                            ? {
                                  name: `${data?.appointmentAtLeast?.value} ${data?.appointmentAtLeast?.type?.toLowerCase()}`,
                                  data: data?.appointmentAtLeast?.value,
                                  type: data?.appointmentAtLeast?.type,
                              }
                            : {},
                        appointmentUntil: {
                            name: `${data?.appointmentUntil?.value} ${data?.appointmentUntil?.type?.toLowerCase()}`,
                            data: data?.appointmentUntil?.value,
                            type: data?.appointmentUntil?.type,
                        },
                        cancelOnline: data.cancelOnline,
                        timeBeforeEvent: {
                            name: `${data?.timeBeforeEvent?.value} ${data?.timeBeforeEvent?.type?.toLowerCase()}`,
                            data: data?.timeBeforeEvent?.value,
                            type: data?.timeBeforeEvent?.type,
                        },
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
                dispatch(
                    editScheduledEvent(
                        id,
                        {
                            ...data,
                            appointmentAtLeast: { value: data?.appointmentAtLeast?.data, type: data?.appointmentAtLeast?.type },
                            appointmentUntil: { value: data?.appointmentUntil?.data, type: data?.appointmentUntil?.type },
                            timeBeforeEvent: { value: data?.timeBeforeEvent?.data, type: data?.timeBeforeEvent?.type },
                        },
                        setLoading,
                        history,
                        tab,
                    ),
                );
            }
        }
    };

    console.log(data, 'data');

    return (
        <>
            <CustomCard col="12" title="Allow Booking an Appointment">
                <CustomGridLayout>
                    <CustomDropDown
                        options={BookingHours?.map((cat, i) => {
                            return { name: cat.name, data: cat.value, type: cat.type };
                        })}
                        name="appointmentAtLeast"
                        data={data}
                        onChange={handleChange}
                    />
                    <CustomDropDown
                        options={BookingHours?.map((cat, i) => {
                            return { name: cat.name, data: cat.value, type: cat.type };
                        })}
                        name="appointmentUntil"
                        label="Appointment Until"
                        data={data}
                        onChange={handleChange}
                    />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Cancellation">
                <CustomGridLayout>
                    <CustomDropDown options={yesNoOptions} name="cancelOnline" data={data} onChange={handleChange} />
                    <CustomDropDown
                        options={BookingHours?.map((cat, i) => {
                            return { name: cat.name, data: cat.value, type: cat.type };
                        })}
                        name="timeBeforeEvent"
                        data={data}
                        onChange={handleChange}
                    />
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
