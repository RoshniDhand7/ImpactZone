import React, { useEffect, useMemo, useState } from 'react';
import FormPage from '../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../shared/Cards/CustomCard';
import {
    CustomAsyncReactSelect,
    CustomCalenderInput,
    CustomCheckbox,
    CustomDropDown,
    CustomInput,
    CustomMultiselect,
    CustomTextArea,
} from '../../shared/Input/AllInputs';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEventMember, getCalendarBooking, repeatCalendarEvent } from '../../redux/actions/Calendar/CalendarAction';
import { confirmDelete, convertToDateTime, getTime, showFormErrors, updateEndTime } from '../../utils/commonFunctions';
import useEmployees from '../../hooks/Employees/useEmployees';
import { eventStatusOptions, generateSequence, memberStatusOptions, WeekDaysOption } from '../../utils/dropdownConstants';
import formValidation from '../../utils/validations';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../shared/Button/CustomButton';
import moment from 'moment';

const RepeatEvents = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(getCalendarBooking(id));
        }
    }, [id, dispatch]);

    const history = useHistory();

    const { calendarEvent } = useSelector((state) => state.calendar);

    useEffect(() => {
        if (calendarEvent && Object.keys(calendarEvent).length > 0) {
            setData((prevData) => ({
                ...prevData,
                staff: calendarEvent.staff || null,
                eventDate: calendarEvent.eventDate ? new Date(calendarEvent.eventDate) : null,
                startTime: calendarEvent.startTime ? convertToDateTime(calendarEvent.startTime) : null,
                duration: Number(calendarEvent.duration) || null,
                member: calendarEvent.member || null,
                event: calendarEvent.event || null,
                status: calendarEvent.status,
                endTime: updateEndTime(calendarEvent.startTime, Number(calendarEvent.duration)),
                type: calendarEvent.type,
                classScheduleId: calendarEvent.scheduleClass,
                startDate: calendarEvent?.startDate ? new Date(calendarEvent?.startDate) : null,
                endDate: calendarEvent?.endDate ? new Date(calendarEvent?.endDate) : null,
                days:calendarEvent?.days
            }));
        }
    }, [calendarEvent]);

    const { employees } = useEmployees();
    const suggestions = useMemo(
        () =>
            employees
                ?.filter((item) => Array.isArray(item.isClassLevel) && item.isClassLevel.length > 0)
                ?.map((item) => ({
                    value: item._id,
                    name: `${item.firstName} ${item.middleInitial} ${item.lastName}`,
                })),
        [employees],
    );
    const employeeOptions = useMemo(
        () =>
            employees
                ?.filter((item) => Array.isArray(item.isClassLevel) && item.isClassLevel.length > 0)
                ?.map((item) => ({ name: `${item.firstName} ${item.middleInitial} ${item.lastName}`, value: item?._id })),
        [employees],
    );
    const durationOptions = generateSequence();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        staff: '',
        eventDate: '',
        startTime: '',
        duration: '',
        enrollment: `5/30`,
        member: [],
        services: [],
        employeelevelService: [],
        memberService: [],
        memberStatus: [],
        startDate: '',
        endDate: '',
        daily: true,
        days: [],
    });

    useEffect(() => {
        if (data?.staff) {
            const staff = employees.find((item) => item._id === data.staff);
            const level = staff?.isClassLevel?.[0];
            let eventService = data.event?.eventService?.find((item) => item.eventLevel === level);
            const services = eventService?.services || [];
            setData((prev) => ({
                ...prev,
                employeelevelService: services,
            }));
        } else {
            setData((prev) => ({
                ...prev,
                employeelevelService: [],
            }));
        }
    }, [data.staff, data.event, employees]);

    const handleChange = ({ name, value }) => {
        setData((prev) => {
            const updatedData = { ...prev, [name]: value };
            const formErrors = formValidation(name, value, updatedData);

            if (name === 'duration') {
                updatedData.endTime = updateEndTime(updatedData.startTime, value);
                updatedData.duration = value || null;
            } else if (name === 'startTime') {
                updatedData.endTime = updateEndTime(value, updatedData.duration);
                updatedData.startTime = value || null;
            }

            return { ...updatedData, formErrors };
        });
    };

    const handleChangeDynamicFields = (fieldName, index, event, memberId) => {
        const { name, value } = event.target;
        setData((prevData) => {
            const updatedField = Array.isArray(prevData[fieldName]) ? [...prevData[fieldName]] : [];
            const customIndex = index.rowIndex;
            updatedField[customIndex] = {
                ...updatedField[customIndex],
                [name]: value,
            };
            // dispatch(
            //     editCalendarEventMember(id, _, { member: memberId, service: value, status: 'HOLD' }, () => {
            //         dispatch(getCalendarBooking(id));
            //     }),
            // );

            console.log(updatedField[customIndex], [name], value, 'updatedField>>');
            return {
                ...prevData,
                [fieldName]: updatedField,
            };
        });
    };

    console.log(data, 'data');

    const CustomServiceTemplate = (row, index) => {
        const idsToMatch = data?.employeelevelService || [];
        const filteredServices = row?.services?.filter((service) => idsToMatch.includes(service._id)) || [];
        const serviceUse = filteredServices?.find((item) => item.serviceUse);
        const defaultValue = serviceUse?._id || '';
        console.log('filteredServices>>', filteredServices, serviceUse);
        return data?.staff ? (
            filteredServices.length > 0 ? (
                <CustomDropDown
                    name="service"
                    value={data?.memberService?.[index.rowIndex]?.service || defaultValue}
                    onChange={(val) => handleChangeDynamicFields('memberService', index, val, row?._id)}
                    options={filteredServices.map((service) => ({
                        name: service.name,
                        value: service._id,
                    }))}
                    fieldName="services"
                    customIndex={index.rowIndex}
                    showLabel={false}
                    col={8}
                    placeholder="Select Service"
                />
            ) : (
                <div className="flex">
                    <div className="p-error">No Service Found</div>
                    <div className="cursor-pointer ml-2 text-blue-500 text-underline" onClick={() => history.push('/pos')}>
                        POS
                    </div>
                </div>
            )
        ) : (
            <div>Please Select Employee</div>
        );
    };

    const CustomStatusTemplate = (row, index) => {
        const defaultValue = memberStatusOptions[0]?.value || '';
        return (
            <>
                <CustomDropDown
                    name="status"
                    value={data?.memberStatus?.[index.rowIndex]?.status || defaultValue}
                    onChange={(val) => handleChangeDynamicFields('memberStatus', index, val)}
                    fieldName="status"
                    customIndex={index.rowIndex}
                    showLabel={false}
                    options={memberStatusOptions}
                    col={8}
                />
            </>
        );
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(
                    deleteEventMember(id, col._id, () => {
                        dispatch(getCalendarBooking(id));
                    }),
                );
            },
            'Do you want to delete this Member ?',
            position,
        );
    };

    const ActionTemplate = (r) => {
        return <i className="mx-2 cursor-pointer pi pi-trash" onClick={() => onDelete(r)}></i>;
    };

    const VerifyTemplate = (r) => {
        return <i className="mx-2 cursor-pointer pi pi-times-circle text-red-500"></i>;
    };

    const handleSave = () => {
        let ignore = '';
        if (data?.daily) {
            ignore = ['services', 'days'];
        } else {
            ignore = ['services'];
        }
        if (showFormErrors(data, setData, ignore)) {
            dispatch(
                repeatCalendarEvent(
                    id,
                    setLoading,
                    {
                        classScheduleId: data?.classScheduleId,
                        startDate: moment(data.startDate).format('YYYY-MM-DD'),
                        endDate: moment(data.endDate).format('YYYY-MM-DD'),
                        duration: data.duration,
                        staff: data.staff,
                        schedule: [
                            {
                                days: data?.days,
                                startTime: getTime(data.startTime),
                                duration: data.duration,
                                endTime: getTime(data.endTime),
                            },
                        ],
                        type: data?.type,
                        daily: data?.daily,
                    },
                    () => {
                        history.push('/calender');
                    },
                ),
            );
        }
    };

    console.log(data, 'data');

    return (
        <>
            <FormPage backText="Calendar">
                <CustomCard col="12" title="Event Details">
                    <CustomGridLayout>
                        <div className="col-4 p-1">
                            <label>Employee</label>
                            <CustomAsyncReactSelect
                                name="staff"
                                suggestions={suggestions}
                                options={employeeOptions}
                                placeholder="Search Employee"
                                showLabel={false}
                                value={data.staff}
                                onChange={handleChange}
                                col={12}
                            />
                        </div>

                        {/* <CustomCalenderInput name="eventDate" onChange={handleChange} data={data} col={4} /> */}
                        {/* <CustomDropDown name="duration" options={durationOptions} onChange={handleChange} data={data} col={4} /> */}
                        <CustomInput name="enrollment" data={data} disabled />
                        <CustomDropDown name="status" options={eventStatusOptions} onChange={handleChange} data={data} col={4} />
                        <CustomTextArea name="statusReason" data={data} />
                    </CustomGridLayout>
                </CustomCard>
                <h2 className="text-semibold text-2xl ml-2 mt-2">Manage Event</h2>
                <DataTable value={data?.member} scrollable scrollHeight="400px" tableStyle={{ minWidth: '50rem' }}>
                    <Column
                        field="firstName"
                        body={(r) => r?.firstName + '' + r?.lastName}
                        header="Member"
                        className="bg-light-green font-bold"
                        style={{ width: '20%' }}
                    />
                    <Column
                        className="bg-light-green font-bold"
                        header="Status"
                        body={(rowData, index) => CustomStatusTemplate(rowData, index)}
                        style={{ width: '25%' }}
                    />
                    <Column
                        className="bg-light-green font-bold"
                        header="Service"
                        body={(rowData, index) => CustomServiceTemplate(rowData, index)}
                        style={{ width: '25%' }}
                    />
                    <Column header="Verified" className="bg-light-green font-bold" body={VerifyTemplate} style={{ width: '15%' }} />
                    <Column header="Action" className="bg-light-green font-bold" body={ActionTemplate} style={{ width: '15%' }} />
                </DataTable>
                <CustomCard col="12" title="Dates">
                    <CustomGridLayout>
                        <CustomCalenderInput name="startDate" onChange={handleChange} data={data} col={4} />
                        <CustomCalenderInput name="endDate" onChange={handleChange} data={data} col={4} minDate={data?.startDate} />
                        <CustomCalenderInput name="startTime" data={data} onChange={handleChange} col={4} timeOnly hourFormat="12" />
                        <CustomDropDown name="duration" options={durationOptions} onChange={handleChange} data={data} col={4} />
                        <CustomCalenderInput name="endTime" data={data} onChange={handleChange} col={4} timeOnly hourFormat="12" disabled={true} />
                        <CustomCheckbox name="daily" label="Daily" onChange={handleChange} data={data} col="1" extraClassName="my-auto" />
                        {!data?.daily && <CustomMultiselect name="days" onChange={handleChange} data={data} options={WeekDaysOption} col={3} />}
                        <CustomButtonGroup>
                            <PrimaryButton label="Save" className="mx-2" onClick={handleSave} loading={loading} />
                            <LightButton label="Cancel" onClick={() => history.goBack()} />
                        </CustomButtonGroup>
                    </CustomGridLayout>
                </CustomCard>
            </FormPage>
        </>
    );
};

export default RepeatEvents;
