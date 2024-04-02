import React, { useEffect, useState } from 'react';
import { CustomCalenderInput, CustomCheckbox, CustomDropDown, CustomInputNumber, CustomMultiselect } from '../../../../shared/Input/AllInputs';
import { WeekDaysOption, classMeet } from '../../../../utils/dropdownConstants';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import formValidation from '../../../../utils/validations';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { getLocations } from '../../../../redux/actions/ScheduleSettings/locationsActions';
import { getEvents } from '../../../../redux/actions/ScheduleSettings/eventsActions';
import { showArrayFormErrors, showFormErrors } from '../../../../utils/commonFunctions';

const EventClassesForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: '',
        isActive: true,
        classMeet: '',
        schedule: [
            {
                days: [],
                startTime: '',
            },
        ],
    });
    useEffect(() => {
        dispatch(getLocations());
        dispatch(getEvents());
    }, []);
    const { locationDropdown } = useSelector((state) => state.locations);
    const { allEventClassesDropDown } = useSelector((state) => state.event);
    const history = useHistory();
    const loading = useSelector((state) => state?.loader?.isLoading);
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const handleAddSchedule = () => {
        const newSchedule = {
            days: [],
            startTime: '',
        };
        setData((prevData) => ({
            ...prevData,
            schedule: [...prevData.schedule, newSchedule],
        }));
    };

    const handleChangeDynamicField = ({ name, value, customIndex }) => {
        const _newData = { ...data };
        let obj = _newData.schedule[customIndex];
        obj[name] = value;

        const formErrors = formValidation(name, value, obj);
        obj.formErrors = formErrors;
        _newData.schedule[customIndex] = obj;
        setData(() => ({
            ..._newData,
        }));
    };

    const getAvailableOptions = (index) => {
        const selectedDays = data.schedule.flatMap((item, idx) => (idx !== index ? item.days : []));
        console.log('selectedDays>>', selectedDays);
        return WeekDaysOption.filter((day) => !selectedDays.includes(day.value));
    };

    const handleRemoveSchedule = (indexToRemove) => {
        setData((prevData) => ({
            ...prevData,
            schedule: prevData.schedule.filter((_, index) => index !== indexToRemove),
        }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            let validatedSchedule = showArrayFormErrors(data.schedule);
            if (!validatedSchedule.isValid) {
                setData((prev) => ({ ...prev, schedule: validatedSchedule.data }));
            }
        }
    };

    return (
        <>
            <FormPage backText="Classes">
                <CustomGridLayout>
                    <CustomDropDown name="name" options={allEventClassesDropDown} onChange={handleChange} data={data} />
                </CustomGridLayout>

                <CustomCard title="When and Where" col="12">
                    <CustomGridLayout>
                        <CustomDropDown name="classMeet" options={classMeet} onChange={handleChange} data={data} />
                        <CustomDropDown name="location" options={locationDropdown} onChange={handleChange} data={data} />
                        <CustomCalenderInput name="startDate" onChange={handleChange} data={data} />
                        <CustomCalenderInput name="endDate" onChange={handleChange} data={data} />
                    </CustomGridLayout>
                    <PrimaryButton label="Add New Schedule" className="mx-2" onClick={handleAddSchedule} loading={loading} />
                    {data?.schedule?.map((scheduleItem, index) => (
                        <div key={index}>
                            <CustomGridLayout extraClass="align-items-center">
                                <CustomCalenderInput
                                    name="startTime"
                                    customIndex={index}
                                    onChange={handleChangeDynamicField}
                                    data={scheduleItem}
                                    timeOnly
                                    placeholder="Select Time"
                                />
                                <CustomMultiselect
                                    name="days"
                                    customIndex={index}
                                    options={getAvailableOptions(index)}
                                    onChange={handleChangeDynamicField}
                                    data={scheduleItem}
                                    col={4}
                                />
                                {index > 0 && <i class="pi pi-minus-circle mt-4" onClick={() => handleRemoveSchedule(index)}></i>}
                            </CustomGridLayout>
                        </div>
                    ))}
                </CustomCard>
                <CustomCard title="Instructor" col="12">
                    <CustomDropDown name="staff" options={classMeet} onChange={handleChange} data={data} />
                </CustomCard>
                <CustomCard title="Participants" col="12">
                    <CustomGridLayout>
                        <CustomInputNumber name="totalCapacity" onChange={handleChange} data={data} />
                        <CustomInputNumber name="waitList" label="How many people can waitlist" onChange={handleChange} data={data} />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard title="Online Scheduling" col="12">
                    <CustomGridLayout>
                        <CustomCheckbox name="allowOnline" label="Allow clients to sign up for this class online" onChange={handleChange} data={data} />
                        <CustomInputNumber name="onlineCapacity" label="Online Capacity" onChange={handleChange} data={data} />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard title="Pricing" col="12">
                    <CustomGridLayout>
                        <CustomCheckbox name="allowClients" label="Allow clients to sign up now and pay later" onChange={handleChange} data={data} />
                        <CustomCheckbox name="classfree" label="Clients can attend this class for free" onChange={handleChange} data={data} />
                    </CustomGridLayout>
                </CustomCard>
                <CustomButtonGroup>
                    <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                    <LightButton label="Cancel" onClick={() => history.goBack()} />
                </CustomButtonGroup>
            </FormPage>
        </>
    );
};

export default EventClassesForm;
