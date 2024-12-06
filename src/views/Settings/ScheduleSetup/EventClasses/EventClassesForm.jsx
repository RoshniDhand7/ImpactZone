import React, { useEffect, useState } from 'react';
import {
    CustomCalenderInput,
    CustomCheckbox,
    CustomDropDown,
    CustomInputNumber,
    CustomInputSwitch,
    CustomMultiselect,
} from '../../../../shared/Input/AllInputs';
import { WeekDaysOption, classMeet } from '../../../../utils/dropdownConstants';
import FormPage from '../../../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import formValidation from '../../../../utils/validations';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../shared/Button/CustomButton';
import { getEvents, getServicesEvents } from '../../../../redux/actions/Settings/ScheduleSetup/eventsActions';
import { convertToDateTime, showArrayFormErrors, showFormErrors } from '../../../../utils/commonFunctions';
import { types } from '../../../../redux/types/types';
import { getLocations } from '../../../../redux/actions/Settings/ScheduleSetup/locationsActions';
import { addClasses, editClasses, getEventClass } from '../../../../redux/actions/Settings/ScheduleSetup/eventClassesAction';
import { getEmployeePay, getEmployees } from '../../../../redux/actions/Settings/Employee/employeesAction';

const EventClassesForm = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { employees, employeePayType } = useSelector((state) => state.settings.employee);

    const [data, setData] = useState({
        event: '',
        classMeet: '',
        classLocation: '',
        startDate: '',
        endDate: '',
        schedule: [
            {
                days: [],
                startTime: '',
            },
        ],
        instructor: [
            {
                assistant: null,
                assistantPay: '',
            },
        ],
        staff: null,
        payType: '',
        totalCapacity: null,
        waitlistPeople: null,
        clientSignupClass: false,
        onlineCapacity: null,
        clientPaylater: false,
        clientClassFree: false,
        isActive: true,
    });
    useEffect(() => {
        dispatch(getLocations());
        dispatch(getEvents());
        dispatch(getEmployees());
    }, [dispatch]);
    const { locationDropdown } = useSelector((state) => state.settings.schedule);
    const { eventClassesDropDown } = useSelector((state) => state.settings.schedule);

    let { eventClasses } = useSelector((state) => state.settings.schedule);
    eventClasses = eventClasses?.find((item) => item._id === data?.event);
    const history = useHistory();

    useEffect(() => {
        if (data?.event) {
            setData((prev) => ({ ...prev, totalCapacity: eventClasses?.defaultMaxAttendes, waitlistPeople: eventClasses?.maximumWaitlist }));
        }
    }, [data?.event, eventClasses]);

    useEffect(() => {
        if (id) {
            dispatch(
                getEventClass(id, (data) => {
                    if (data?.staff) {
                        dispatch(getEmployeePay(data?.staff));
                    }
                    setData({
                        event: data.event,
                        classMeet: data.classMeet,
                        classLocation: data.classLocation,
                        startDate: new Date(data.startDate),
                        endDate: new Date(data.endDate),
                        schedule: data.schedule?.map((item) => ({ ...item, startTime: convertToDateTime(item.startTime) })),
                        instructor: data.instructor,
                        staff: data.staff ? data?.staff : null,
                        payType: data.pay,
                        totalCapacity: data.totalCapacity ? data.totalCapacity : eventClasses?.defaultMaxAttendes,
                        waitlistPeople: data.waitlistPeople ? data.waitlistPeople : eventClasses?.maximumWaitlist,
                        clientSignupClass: data.clientSignupClass,
                        onlineCapacity: data.onlineCapacity,
                        clientPaylater: data.clientPaylater,
                        clientClassFree: data.clientClassFree,
                        isActive: data.isActive,
                    });
                    if (data.instructor && data.instructor.length > 0) {
                        for (const instructorItem of data.instructor) {
                            fetchAssistantPayOptions(instructorItem.assistant);
                        }
                    }
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, dispatch, employees, eventClasses]);

    const fetchAssistantPayOptions = async (assistantId) => {
        const employeeWithLevel = employees.find((employee) => employee._id === assistantId);
        if (employeeWithLevel) {
            const payTypeOptions = employeeWithLevel.employeeClassData.map((item) => ({ name: item.label, value: item.payType }));
            const uniquePayTypeOptions = payTypeOptions.filter((option, index, self) => index === self.findIndex((t) => t.value === option.value));
            const defaultPay = employeeWithLevel?.employeeClassData?.find((item) => item.isDefaultPay);

            setData((prev) => ({
                ...prev,
                instructor: prev.instructor.map((inst) =>
                    inst.assistant === assistantId
                        ? { ...inst, assistantPayOptions: uniquePayTypeOptions, assistantPay: defaultPay ? defaultPay.payType : inst.assistantPay }
                        : inst,
                ),
            }));
        }
    };

    const loading = useSelector((state) => state?.loader?.isLoading);
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    useEffect(() => {
        if (data?.event) {
            dispatch(getServicesEvents(data?.event));
            setData((prev) => ({
                ...prev,
                staff: null,
                payType: '',
                instructor: [
                    {
                        assistant: null,
                        assistantPay: '',
                    },
                ],
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.event]);

    const handleAddSchedule = () => {
        const newSchedule = {
            days: [],
            startTime: '',
            timeFormat: '',
        };
        setData((prevData) => ({
            ...prevData,
            schedule: [...prevData.schedule, newSchedule],
        }));
    };
    const handleAddAssistant = () => {
        const newAssistant = {
            assistant: '',
            assistantPay: '',
        };
        setData((prevData) => ({
            ...prevData,
            instructor: [...prevData.instructor, newAssistant],
        }));
    };
    const { servicesEvents } = useSelector((state) => state.settings.schedule);

    const eventLevels = servicesEvents && servicesEvents?.EventService?.map((item) => item.eventLevel?._id);

    const employeesWithLevel = employees
        .filter((employee) => {
            return employee.employeeClassData.some((classData) => eventLevels?.includes(classData.isClassLevel));
        })
        .map((employee) => ({
            name: employee.firstName,
            value: employee._id,
        }));

    useEffect(() => {
        if (data?.staff) {
            dispatch(getEmployeePay(data?.staff));
        }
        return () => {
            dispatch({
                type: types.CHANGE_EMPLOYEES_PAY_TYPE,
                payload: [],
            });
        };
    }, [data?.staff, dispatch]);

    useEffect(() => {
        if (employeePayType) {
            let defaultPay = employeePayType?.employeeClassData?.find((item) => item.isDefaultPay);
            setData((prev) => ({ ...prev, payType: defaultPay ? defaultPay.payType : null }));
        }
    }, [employeePayType, employees]);

    const handleChangeDynamicField = async ({ name, value, customIndex, fieldName }) => {
        const _newData = { ...data };
        let obj = _newData[fieldName][customIndex];
        obj[name] = value;

        if (name === 'assistant') {
            _newData[fieldName][customIndex] = obj;
            setData(() => ({
                ..._newData,
            }));
            await dispatch(getEmployeePay(value));
        }

        const formErrors = formValidation(name, value, obj);
        obj.formErrors = formErrors;
        _newData[fieldName][customIndex] = obj;
        setData(() => ({
            ..._newData,
        }));

        if (name === 'assistant') {
            const selectedAssistant = value;
            const employeeWithLevel = employees.find((employee) => employee._id === selectedAssistant);

            if (employeeWithLevel) {
                const payTypeOptions = employeeWithLevel.employeeClassData.map((item) => ({ name: item.label, value: item.payType }));
                const uniquePayTypeOptions = payTypeOptions.filter((option, index, self) => index === self.findIndex((t) => t.value === option.value));
                const defaultPay = employeeWithLevel?.employeeClassData?.find((item) => item.isDefaultPay);
                setData((prev) => ({
                    ...prev,
                    instructor: prev.instructor.map((inst, idx) =>
                        idx === customIndex
                            ? { ...inst, assistantPayOptions: uniquePayTypeOptions, assistantPay: defaultPay ? defaultPay.payType : null }
                            : inst,
                    ),
                }));
            }
        }
    };

    // const handleChangeDynamicField = ({ name, value, customIndex, fieldName }) => {
    //     const _newData = { ...data };
    //     let obj = _newData[fieldName][customIndex];
    //     obj[name] = value;
    //     if (name === 'assistant') {
    //         _newData[fieldName][customIndex] = obj;
    //         setData(() => ({
    //             ..._newData,
    //         }));
    //         dispatch(getEmployeePay(value));
    //     }
    //     const formErrors = formValidation(name, value, obj);
    //     obj.formErrors = formErrors;
    //     _newData[fieldName][customIndex] = obj;
    //     setData(() => ({
    //         ..._newData,
    //     }));
    // };

    // const getAvailableOptions = (index) => {
    //     const selectedDays = data.schedule?.flatMap((item, idx) => (idx !== index ? item.days : []));
    //     return WeekDaysOption.filter((day) => !selectedDays.includes(day.value));
    // };

    const getPayOptions = () => {
        let payType = employeePayType?.employeeClassData?.map((item) => ({ name: item.label, value: item.payType }));
        const uniqueOptionsSet = new Set(payType?.map((option) => JSON.stringify(option)));
        const uniqueOptions = Array.from(uniqueOptionsSet)?.map((optionString) => JSON.parse(optionString));
        return uniqueOptions;
    };
    const getAssistantOptions = (index) => {
        const existingAssistants = data.instructor.filter((_, idx) => idx !== index)?.flatMap((item) => item.assistant);
        const optionsToExclude = [data.staff, ...existingAssistants];
        return employeesWithLevel.filter((level) => !optionsToExclude.includes(level.value));
    };

    const handleRemove = (indexToRemove, fieldName) => {
        setData((prevData) => ({
            ...prevData,
            [fieldName]: prevData[fieldName].filter((_, index) => index !== indexToRemove),
        }));
    };

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            let validatedSchedule = showArrayFormErrors(data.schedule);
            if (!validatedSchedule.isValid) {
                setData((prev) => ({ ...prev, schedule: validatedSchedule.data }));
            }
            if (validatedSchedule.isValid) {
                if (id) {
                    dispatch(editClasses(id, data, history));
                } else {
                    dispatch(addClasses(data, history));
                }
            }
        }
    };

    return (
        <>
            <FormPage backText="Classes">
                <CustomGridLayout>
                    <CustomDropDown name="event" label="Class Name" options={eventClassesDropDown} onChange={handleChange} data={data} />
                    <CustomInputSwitch name="isActive" data={data} onChange={handleChange} extraClassName="text-right" />
                </CustomGridLayout>
                <CustomCard title="When and Where" col="12">
                    <CustomGridLayout>
                        <CustomDropDown name="classMeet" label="How often does class meet?" options={classMeet} onChange={handleChange} data={data} col="6" />
                        <CustomDropDown name="classLocation" options={locationDropdown} onChange={handleChange} data={data} col="6" />
                        <CustomCalenderInput name="startDate" onChange={handleChange} data={data} />
                        <CustomCalenderInput name="endDate" onChange={handleChange} data={data} disabled={!data?.startDate} />
                    </CustomGridLayout>
                    <CustomGridLayout extraClass="justify-content-end">
                        <PrimaryButton label="Add New Schedule" className="mx-2 " onClick={handleAddSchedule} loading={loading} />
                    </CustomGridLayout>
                    {data?.schedule?.map((scheduleItem, index) => (
                        <div key={index}>
                            <CustomGridLayout extraClass="align-items-center">
                                {/* <CustomInputTime
                                    name="startTime"
                                    onChange={handleChangeDynamicField}
                                    data={scheduleItem}
                                    fieldName="schedule"
                                    customIndex={index}
                                /> */}
                                <CustomCalenderInput
                                    name="startTime"
                                    customIndex={index}
                                    onChange={handleChangeDynamicField}
                                    data={scheduleItem}
                                    fieldName="schedule"
                                    timeOnly
                                    placeholder="Select Time"
                                    hourFormat="12"
                                />
                                <CustomMultiselect
                                    name="days"
                                    customIndex={index}
                                    onChange={handleChangeDynamicField}
                                    data={scheduleItem}
                                    options={WeekDaysOption}
                                    fieldName="schedule"
                                    col={4}
                                />
                                {index > 0 && <i className="pi pi-minus-circle mt-4" onClick={() => handleRemove(index, 'schedule')}></i>}
                            </CustomGridLayout>
                        </div>
                    ))}
                </CustomCard>
                <CustomCard title="Instructor" col="12">
                    <CustomGridLayout>
                        <CustomDropDown name="staff" options={employeesWithLevel} onChange={handleChange} data={data} />
                        <CustomDropDown name="payType" options={getPayOptions()} onChange={handleChange} data={data} />
                    </CustomGridLayout>
                    <CustomGridLayout extraClass="justify-content-end">
                        <PrimaryButton label="Add Assistant" className="mx-2" onClick={handleAddAssistant} loading={loading} />
                    </CustomGridLayout>
                    {data?.instructor?.map((inst, index) => (
                        <div key={index}>
                            <CustomGridLayout extraClass="align-items-center">
                                <CustomDropDown
                                    name="assistant"
                                    customIndex={index}
                                    options={getAssistantOptions(index)}
                                    fieldName="instructor"
                                    onChange={handleChangeDynamicField}
                                    data={inst}
                                />
                                <CustomDropDown
                                    name="assistantPay"
                                    customIndex={index}
                                    options={inst.assistantPayOptions}
                                    fieldName="instructor"
                                    onChange={handleChangeDynamicField}
                                    data={inst}
                                />
                                {index > 0 && <i className="pi pi-minus-circle mt-4" onClick={() => handleRemove(index, 'instructor')}></i>}
                            </CustomGridLayout>
                        </div>
                    ))}
                </CustomCard>
                <CustomCard title="Participants" col="12">
                    <CustomGridLayout>
                        <CustomInputNumber name="totalCapacity" onChange={handleChange} data={data} />
                        <CustomInputNumber name="waitlistPeople" label="How many people can waitlist" onChange={handleChange} data={data} />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard title="Online Scheduling" col="12">
                    <CustomGridLayout>
                        <CustomCheckbox
                            name="clientSignupClass"
                            label="Allow clients to sign up for this class online"
                            onChange={handleChange}
                            data={data}
                            col="12"
                        />
                        <CustomInputNumber name="onlineCapacity" label="Online Capacity" onChange={handleChange} data={data} col="6" />
                    </CustomGridLayout>
                </CustomCard>
                <CustomCard title="Pricing" col="12">
                    <CustomGridLayout>
                        <CustomCheckbox name="clientPaylater" label="Allow clients to sign up now and pay later" onChange={handleChange} data={data} col="12" />
                        <CustomCheckbox name="clientClassFree" label="Clients can attend this class for free" onChange={handleChange} data={data} col="12" />
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
