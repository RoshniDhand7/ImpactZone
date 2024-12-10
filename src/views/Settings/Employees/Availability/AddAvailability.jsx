import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CustomAsyncReactSelect, CustomCalenderInput, CustomDropDown } from '../../../../shared/Input/AllInputs';
import useEmployees from '../../../../hooks/Employees/useEmployees';
import { useDispatch, useSelector } from 'react-redux';
import { addAvailability, getAvailability, getClubFromEmployee } from '../../../../redux/actions/EmployeeSettings/availabilityAction';
import formValidation from '../../../../utils/validations';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { durationTypeOptions, repeatWeekOptions, yesNoOptions } from '../../../../utils/dropdownConstants';
import FormPage from '../../../../shared/Layout/FormPage';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import { Button } from 'primereact/button';
import PrimaryButton, { CustomButtonGroup } from '../../../../shared/Button/CustomButton';
import { confirmDelete, endOfWeek, showFormErrors, startOfWeek } from '../../../../utils/commonFunctions';
import { useHistory, useParams } from 'react-router-dom';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';

const AddAvailability = () => {
    const initialState = {
        employee: null,
        club: null,
        trackAvailability: true,
        fromDate: startOfWeek,
        toDate: endOfWeek,
        duration: 30,
        availability: true,
        events: [],
        repeatWeek: '',
    };
    const [data, setData] = useState(initialState);
    let [disableEvents, setDisableEvents] = useState([]);
    const [startDayOfWeek, setStartDayOfWeek] = useState(startOfWeek);
    const [endDayOfWeek, setEndDayOfWeek] = useState(endOfWeek);
    const [openRepeatWeek, setOpenRepeatWeek] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const { employees } = useEmployees();
    const calendarRef = useRef(null);
    useEffect(() => {
        if (id) {
            dispatch(
                getAvailability(id, (res) => {
                    setData({
                        employee: res.employee,
                        club: res.club,
                    });
                }),
            );
        }
    }, [id, dispatch]);

    const { employeeClubs, availability } = useSelector((state) => state?.employeeAvailability);
    const employeeOptions = useMemo(
        () => employees.map((item) => ({ name: `${item.firstName} ${item?.middleInitial} ${item?.lastName}`, value: item?._id })),
        [employees],
    );

    const suggestions = useMemo(
        () =>
            employees.map((item) => ({
                value: item._id,
                name: `${item.firstName} ${item?.middleInitial} ${item?.lastName}`,
            })),
        [employees],
    );

    useEffect(() => {
        if (data?.employee) {
            dispatch(getClubFromEmployee(data?.employee));
        }
    }, [data?.employee, dispatch]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);

        if (name === 'employee') {
            setData((prev) => ({ ...prev, [name]: value, club: null }));
        } else {
            setData((prev) => ({ ...prev, [name]: value, formErrors }));
        }
    };
    const handleDateSelect = useCallback(
        (selectInfo) => {
            const { start, end, view } = selectInfo;
            const dayName = moment(start).format('dddd');

            if (view.type === 'timeGridWeek') {
                const newEvent = { start: start.toISOString(), end: end.toISOString() };
                addNewEvent(newEvent, dayName);
                view.calendar.unselect();
                view.calendar.addEvent(newEvent);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data],
    );
    const addNewEvent = useCallback(
        (event, dayName) => {
            if (event?.start) {
                setData((prevAccess) => ({
                    ...prevAccess,
                    events: [
                        ...(prevAccess?.events || []),
                        {
                            day: dayName,
                            start: event.start,
                            end: event.end,
                            isAvailable: data.availability,
                        },
                    ],
                }));
            }
        },
        [data],
    );

    const handleEventResize = useCallback(
        (resized) => {
            const { end } = resized.event;
            const dayName = moment(end).format('dddd');
            if (isEventConflict(dayName, end)) {
                return;
            }
            setData((prevAccess) => ({
                ...prevAccess,
                events: prevAccess.events.map((item) => {
                    if (item.day === dayName && moment(resized.oldEvent.end).toISOString() === item.end) {
                        return { ...item, end: end.toISOString() };
                    }
                    return item;
                }),
            }));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data],
    );
    const isEventConflict = (day, end) => {
        return data.events.some((sc) => day === sc.day && moment(end).toISOString() > sc.start && moment(end).toISOString() <= sc.end);
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            dispatch(
                addAvailability(data, () => {
                    history.goBack();
                }),
            );
        }
    };

    useEffect(() => {
        if (data?.club && Object.keys(availability)?.length > 0) {
            let avail = availability?.find((item) => item?.club === data?.club);
            let otherEvents = availability
                ?.filter((item) => item?.club !== data?.club && item.events?.length > 0)
                ?.reduce(
                    (acc, curr) => [
                        ...acc,
                        ...curr.events.map((event) => ({
                            ...event,
                            club: employeeClubs?.find((item) => item.value === curr.club),
                        })),
                    ],
                    [],
                );

            if (avail && avail?.events !== data?.events) {
                setData((prev) => ({
                    ...prev,
                    trackAvailability: avail.trackAvailability,
                    fromDate: new Date(avail.fromDate),
                    toDate: new Date(avail.toDate),
                    duration: avail.duration,
                    availability: true,
                    events: avail.events,
                }));
            }
            setDisableEvents(otherEvents);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.club, availability]);

    useEffect(() => {
        if (calendarRef.current && data?.fromDate) {
            const fromDate = new Date(data?.fromDate);

            if (!isNaN(fromDate)) {
                calendarRef.current.getApi().gotoDate(fromDate);
            }
        }
    }, [data?.fromDate]);

    const deleteConfirm = (e, position) => {
        confirmDelete(
            () => {
                handleDeleteEvent(e);
            },
            'Do you want to delete this Availability ?',
            position,
        );
    };
    const handleDeleteEvent = useCallback((event) => {
        const { start, end } = event.event;
        const deletedEventStartTime = moment(start).toISOString();
        const deletedEventEndTime = moment(end).toISOString();

        setData((prev) => ({
            ...prev,
            events: prev.events.filter((item) => item.start !== deletedEventStartTime || item.end !== deletedEventEndTime),
        }));
    }, []);

    let clubName = employeeClubs?.find((item) => item.value === data?.club);

    const clearWeek = () => {
        const filteredEvents = data?.events.filter((event) => {
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);
            return !((eventStart >= startDayOfWeek && eventStart <= endDayOfWeek) || (eventEnd >= startDayOfWeek && eventEnd <= endDayOfWeek));
        });

        setData((prev) => ({
            ...prev,
            events: filteredEvents,
        }));
    };

    const handleDatesSet = useCallback(
        (info) => {
            if (startDayOfWeek !== info.start || endDayOfWeek !== info.end) {
                const startOfWeek = info.start;
                const endOfWeek = new Date(moment(info.end).subtract(1, 'days'));

                setStartDayOfWeek(startOfWeek);
                setEndDayOfWeek(endOfWeek);
            }
        },
        [startDayOfWeek, endDayOfWeek],
    );

    const [validRange, setValidRange] = useState();

    useEffect(() => {
        if ((data?.toDate && startDayOfWeek, data?.fromDate)) {
            setValidRange({
                start: data.fromDate,
                end: new Date(moment(data.toDate).add(1, 'days')),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.toDate, data.fromDate]);

    const handleRepeat = (repeatOption, event) => {
        const repeatedEvents = [];
        let repeatCount = 0;

        const from = new Date(data.fromDate);
        const to = new Date(data.toDate);
        const msInWeek = 7 * 24 * 60 * 60 * 1000;

        switch (repeatOption) {
            case 'INDEFINITELY':
                repeatCount = Math.floor((to - from) / msInWeek);
                break;
            case 'NEXT_WEEK':
                repeatCount = 1;
                break;
            case 'NEXT_2_WEEKS':
                repeatCount = 2;
                break;
            case 'NEXT_4_WEEKS':
                repeatCount = 4;
                break;
            default:
                repeatCount = 0;
                break;
        }

        for (let i = 1; i <= repeatCount; i++) {
            event.forEach((event) => {
                const nextStartDate = new Date(event.start);
                const nextEndDate = new Date(event.end);

                nextStartDate.setDate(nextStartDate.getDate() + i * 7);
                nextEndDate.setDate(nextEndDate.getDate() + i * 7);

                repeatedEvents.push({
                    ...event,
                    start: nextStartDate.toISOString(),
                    end: nextEndDate.toISOString(),
                });
            });
        }

        return repeatedEvents;
    };

    let eventsofWeek = data?.events?.filter((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        return (
            (eventStart >= startDayOfWeek && eventStart <= endDayOfWeek) ||
            (eventEnd >= startDayOfWeek && eventEnd <= endDayOfWeek) ||
            (eventStart <= startDayOfWeek && eventEnd >= endDayOfWeek)
        );
    });

    const handleRepeatSave = () => {
        const _events = [...data.events, ...handleRepeat(data?.repeatWeek, eventsofWeek, startDayOfWeek)].filter(
            (event, index, self) =>
                index ===
                self.findIndex(
                    (e) => new Date(e.start).getTime() === new Date(event.start).getTime() && new Date(e.end).getTime() === new Date(event.end).getTime(),
                ),
        );

        setData((prev) => ({ ...prev, events: _events, repeatWeek: '' }));
        setOpenRepeatWeek(false);
    };

    return (
        <>
            <FormPage backText="Availability" backTo="/settings/employee">
                <CustomCard col={12} title="Availability">
                    <CustomGridLayout>
                        <div className="col-4 ">
                            <label className="font-bold ml-1 mb-3">Employee</label>
                            <CustomAsyncReactSelect
                                name="employee"
                                field="fullName"
                                suggestions={suggestions}
                                options={employeeOptions}
                                placeholder="Search employee"
                                showLabel={false}
                                value={data?.employee}
                                onChange={handleChange}
                                extraClassName="  "
                                col={12}
                            />
                        </div>

                        <CustomDropDown name="club" options={employeeClubs} onChange={handleChange} data={data} />
                        <CustomDropDown name="trackAvailability" options={yesNoOptions} onChange={handleChange} data={data} />
                        <CustomCalenderInput name="fromDate" onChange={handleChange} data={data} col={3} maxDate={data.toDate} />
                        <CustomCalenderInput name="toDate" onChange={handleChange} data={data} col={3} minDate={data?.fromDate} />
                        <CustomDropDown name="duration" options={durationTypeOptions} data={data} onChange={handleChange} col={3} />
                        <CustomDropDown name="availability" options={yesNoOptions} data={data} onChange={handleChange} col={3} />
                    </CustomGridLayout>
                    {data?.club && data?.trackAvailability && (
                        <>
                            <span className="p-buttonset my-2">
                                <Button icon="pi pi-angle-left" size="small" onClick={() => calendarRef.current.getApi().prev()} />
                                <Button icon="pi pi-angle-right" size="small" onClick={() => calendarRef.current.getApi().next()} />
                            </span>
                            <FullCalendar
                                ref={calendarRef}
                                plugins={[timeGridPlugin, interactionPlugin]}
                                initialView="timeGridWeek"
                                dayHeaderFormat={{ month: 'short', day: 'numeric' }}
                                selectOverlap={false}
                                views={{
                                    timeGridWeek: {
                                        type: 'timeGrid',
                                        duration: { weeks: 1 },
                                        // dayHeaderFormat: { weekday: 'long' },
                                    },
                                }}
                                validRange={validRange}
                                datesSet={handleDatesSet}
                                eventOverlap={false}
                                initialDate={data?.fromDate ? new Date(data?.fromDate) : new Date()}
                                slotDuration={`00:${data?.duration}:00`}
                                headerToolbar=""
                                selectable={true}
                                expandRows={true}
                                editable={true}
                                eventStartEditable={false}
                                droppable={false}
                                eventResize={handleEventResize}
                                select={handleDateSelect}
                                eventClick={deleteConfirm}
                                events={[
                                    ...(data?.events ?? []).map((item) => ({
                                        start: item.start,
                                        end: item.end,
                                        club: data?.club,
                                        editable: true,
                                        color: item.isAvailable ? '#8fdf82' : '#ff9f89',
                                        title: clubName?.name,
                                    })),

                                    ...disableEvents?.map((item) => ({
                                        start: item.start,
                                        end: item.end,
                                        club: item.club,
                                        editable: false,
                                        color: '#d3d3d3',
                                        textColor: '#888888',
                                        title: item?.club?.name,
                                    })),
                                ]}
                                slotEventOverlap={false}
                            />
                        </>
                    )}
                </CustomCard>
                {data?.club && data?.trackAvailability && (
                    <CustomButtonGroup>
                        <PrimaryButton label="Repeat Week" className="mx-2" loading={false} onClick={() => setOpenRepeatWeek(true)} />
                        <PrimaryButton label="Clear Week" className="mx-2" onClick={clearWeek} loading={false} />
                        <PrimaryButton label="Save" className="" onClick={handleSave} loading={false} />
                    </CustomButtonGroup>
                )}
            </FormPage>
            <CustomDialog
                width="50vh"
                title={'Repeat Week'}
                visible={openRepeatWeek}
                onCancel={() => {
                    setOpenRepeatWeek(null);
                }}
                loading={false}
                onSave={handleRepeatSave}
            >
                <CustomGridLayout>
                    <CustomDropDown name="repeatWeek" col={12} data={data} options={repeatWeekOptions} onChange={handleChange} draggable={false} />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default AddAvailability;
