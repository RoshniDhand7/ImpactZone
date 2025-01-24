import React, { useEffect, useMemo, useState } from 'react';
import FormPage from '../../shared/Layout/FormPage';
import CustomCard, { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { CustomButton } from '../../shared/Button/CustomButton';
import { CustomAsyncReactSelect, CustomCalenderInput, CustomDropDown, CustomInput, CustomTextArea } from '../../shared/Input/AllInputs';
import useEmployees from '../../hooks/Employees/useEmployees';
import { eventStatusOptions, generateSequence, memberStatusOptions } from '../../utils/dropdownConstants';
import AddMember from './AddMember';
import { deleteEvent, deleteEventMember, editCalendarEventMember, getCalendarBooking } from '../../redux/actions/Calendar/CalendarAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { confirmDelete, convertToDateTime, getTime } from '../../utils/commonFunctions';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import _ from 'lodash';
import moment from 'moment';

const ManageEvents = () => {
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
                staff: calendarEvent.staff?._id || null,
                eventDate: calendarEvent.eventDate ? new Date(calendarEvent.eventDate) : null,
                startTime: calendarEvent.startTime ? convertToDateTime(calendarEvent.startTime) : null,
                duration: Number(calendarEvent.duration) || null,
                member: calendarEvent.member || null,
                event: calendarEvent.event || null,
                status: calendarEvent.status,
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
        setData((prev) => ({ ...prev, [name]: value }));
        let d;
        if (name === 'startTime') {
            d = getTime(value);
        } else if (name === 'eventDate') {
            d = moment(value).format('YYYY-MM-DD');
        } else {
            d = value;
        }
        dispatch(
            editCalendarEventMember(id, _, { [name]: d }, () => {
                dispatch(getCalendarBooking(id));
            }),
        );
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
            dispatch(
                editCalendarEventMember(id, _, { member: memberId, service: value, status: 'HOLD' }, () => {
                    dispatch(getCalendarBooking(id));
                }),
            );

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

    const [openMemberList, setOpenMemberList] = useState(false);

    const handleRemove = (position) => {
        confirmDelete(
            () => {
                dispatch(
                    deleteEvent(id, () => {
                        history.goBack();
                    }),
                );
            },
            'Do you want to delete this Event ?',
            position,
        );
    };

    return (
        <FormPage backText="Calendar">
            <div className="member-container bg-lightest-blue  border-round-xl shadow-3  flex justify-content-start p-2 mb-2 mx-2">
                <CustomButton className="ml-3" onClick={handleRemove}>
                    Remove Event
                </CustomButton>
                <CustomButton
                    className="ml-3"
                    onClick={() => {
                        setOpenMemberList(true);
                    }}
                >
                    Add Member
                </CustomButton>

                <CustomButton className="ml-3" onClick={() => history.push(`/calender/events/${id}/repeat-event`)}>
                    Repeat Event
                </CustomButton>
                <AddMember openMemberList={openMemberList} setOpenMemberList={setOpenMemberList} member={data?.member} />
            </div>
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
                            isClearable={false}
                        />
                    </div>

                    <CustomCalenderInput name="eventDate" onChange={handleChange} data={data} col={4} />
                    <CustomCalenderInput name="startTime" onChange={handleChange} data={data} col={4} timeOnly hourformat={12} />
                    <CustomDropDown name="duration" options={durationOptions} onChange={handleChange} data={data} col={4} />
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
        </FormPage>
    );
};

export default ManageEvents;
