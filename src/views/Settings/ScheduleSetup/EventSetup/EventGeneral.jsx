import React, { useEffect, useState } from 'react';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import formValidation from '../../../../utils/validations';
import { CustomDropDown, CustomInput, CustomInputSwitch } from '../../../../shared/Input/AllInputs';
import {
    EventCommissionGroupOptions,
    EventTypeOptions,
    defaultMaxAttendesOptions,
    generateSequence,
    waitListExpirationOptions,
    yesNoOptions,
} from '../../../../utils/dropdownConstants';
import { useDispatch } from 'react-redux';
import CustomPickList from '../../../../shared/Input/CustomPickList';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { useHistory, useParams } from 'react-router-dom';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { addScheduledEvent, getScheduledEvent, editScheduledEvent } from '../../../../redux/actions/Settings/ScheduleSetup/eventsActions';
import useLocationType from '../../../../hooks/Schedule/useLocationType';

const EventGeneral = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const { locationTypeDropdown } = useLocationType();
    const [data, setData] = useState({
        isActive: true,
        name: '',
        eventType: 'CLASS',
        internalUse: false,
        locationType: '',
        defaultMaxAttendes: 10,
        eventCommissionType: 'PER_EVENT',
        availableOnline: false,
        trackAttendees: false,
        maximumWaitlist: 10,
        waitListExpiration: 'EVENT_START',
        employee: false,
        location: false,
        member: false,
        employee1: false,
        location1: false,
        member1: false,
        memberVerification: false,
        employeeVerification: false,
        autoComplete: false,
        overBooking: false,
        cancelNc: false,
        cancelC: false,
        rebook: false,
        duration: [],
    });
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
                        isActive: data.isActive,
                        name: data.name,
                        eventType: data.eventType,
                        internalUse: data.internalUse,
                        locationType: data.locationType,
                        defaultMaxAttendes: data.defaultMaxAttendes === 0 ? '0' : data.defaultMaxAttendes,
                        eventCommissionType: data.eventCommissionType,
                        availableOnline: data.availableOnline,
                        trackAttendees: data.trackAttendees,
                        maximumWaitlist: data.maximumWaitlist === 0 ? '0' : data.maximumWaitlist,
                        waitListExpiration: data.waitListExpiration,
                        employee: data.requiredToCreate.employee,
                        location: data.requiredToCreate.location,
                        member: data.requiredToCreate.member,
                        employee1: data.requiredtoComplete.employee,
                        location1: data.requiredtoComplete.location,
                        member1: data.requiredtoComplete.member,
                        memberVerification: data.requiredtoComplete.memberVerification,
                        employeeVerification: data.requiredtoComplete.employeeVerification,
                        autoComplete: data.requiredtoComplete.autoComplete,
                        overBooking: data.overBooking,
                        cancelNc: data.cancelNc,
                        cancelC: data.cancelC,
                        rebook: data.rebook,
                        duration: data.duration,
                    });
                }),
            );
        }
    }, [id, dispatch]);

    const durationList = generateSequence();

    const handleSave = (tab) => {
        if (showFormErrors(data, setData)) {
            const {
                employee,
                location,
                member,
                employee1,
                location1,
                member1,
                memberVerification,
                employeeVerification,
                maximumWaitlist,
                defaultMaxAttendes,
                autoComplete,
                ...rest
            } = data;
            const payload = {
                ...rest,
                defaultMaxAttendes: defaultMaxAttendes === '0' ? 0 : defaultMaxAttendes,
                maximumWaitlist: maximumWaitlist === '0' ? 0 : maximumWaitlist,
                requiredToCreate: { employee, location, member },
                requiredtoComplete: { employee: employee1, location: location1, member: member1, memberVerification, employeeVerification, autoComplete },
            };
            if (id) {
                dispatch(editScheduledEvent(id, payload, setLoading, history, tab));
            } else {
                dispatch(addScheduledEvent(data, setLoading, history, tab));
            }
        }
    };

    console.log('data>>', data);

    return (
        <>
            <CustomCard col="12" title="Personal">
                <CustomGridLayout extraClass="justify-content-end ">
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} extraClassName="text-right" />
                </CustomGridLayout>
                <CustomGridLayout>
                    <CustomInput name="name" required data={data} onChange={handleChange} />
                    <CustomDropDown name="eventType" options={EventTypeOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="internalUse" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="locationType" data={data} onChange={handleChange} options={locationTypeDropdown} />
                    <CustomDropDown name="defaultMaxAttendes" options={defaultMaxAttendesOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="eventCommissionType" options={EventCommissionGroupOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="availableOnline" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="trackAttendees" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="maximumWaitlist" options={defaultMaxAttendesOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="waitListExpiration" options={waitListExpirationOptions} onChange={handleChange} data={data} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Required To Create">
                <CustomGridLayout>
                    <CustomDropDown name="employee" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="location" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="member" options={yesNoOptions} onChange={handleChange} data={data} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Required To Complete">
                <CustomGridLayout>
                    <CustomDropDown name="employee1" label="Employee" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="location1" label="Location" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="member1" label="Member" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="memberVerification" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="employeeVerification" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="autoComplete" options={yesNoOptions} onChange={handleChange} data={data} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Booking & Cancellation">
                <CustomGridLayout>
                    <CustomDropDown name="overBooking" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="cancelNc" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="cancelC" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomDropDown name="rebook" options={yesNoOptions} onChange={handleChange} data={data} />
                </CustomGridLayout>
            </CustomCard>
            <CustomCard col="12" title="Durations">
                <CustomPickList name="duration" selected={data?.duration} sourceData={durationList} onPickListChange={handleChange} showTargetControls={true} />
                {<div className="text-red text-sm">{data?.formErrors?.duration}</div>}
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" onClick={() => handleSave('')} loading={loading} />
                <PrimaryButton label="Save & Next" className="mx-2" onClick={() => handleSave('?tab=services')} loading={loading} />
                <LightButton label="Cancel" onClick={() => history.replace('/settings/schedule?tab=events-setups')} />
            </CustomButtonGroup>
        </>
    );
};

export default EventGeneral;
