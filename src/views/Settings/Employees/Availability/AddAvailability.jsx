import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CustomAsyncReactSelect, CustomCalenderInput, CustomDropDown } from '../../../../shared/Input/AllInputs';
import useEmployees from '../../../../hooks/Employees/useEmployees';
import { useDispatch, useSelector } from 'react-redux';
import { addAvailability, getClubFromEmployee } from '../../../../redux/actions/EmployeeSettings/availabilityAction';
import formValidation from '../../../../utils/validations';
import CustomCard, { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { durationTypeOptions, yesNoOptions } from '../../../../utils/dropdownConstants';
import FormPage from '../../../../shared/Layout/FormPage';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import { Button } from 'primereact/button';
import PrimaryButton, { CustomButtonGroup } from '../../../../shared/Button/CustomButton';
import { showFormErrors } from '../../../../utils/commonFunctions';
import { useHistory } from 'react-router-dom';

const AddAvailability = () => {
    const [data, setData] = useState({
        employee: null,
        club: null,
        trackAvailability: true,
        fromDate: '',
        toDate: '',
        duration: 30,
        availability: true,
        events: [],
    });
    const dispatch = useDispatch();
    const history = useHistory();

    console.log(data?.employee);
    const { allEmployees } = useEmployees();
    const calendarRef = useRef(null);

    const { employeeClubs, availability } = useSelector((state) => state?.employeeAvailability);

    const employeeOptions = useMemo(
        () => allEmployees.map((item) => ({ name: `${item.firstName} ${item?.middleInitial} ${item?.lastName}`, value: item?._id })),
        [allEmployees],
    );

    const suggestions = useMemo(
        () =>
            allEmployees.map((item) => ({
                value: item._id,
                name: `${item.firstName} ${item?.middleInitial} ${item?.lastName}`,
            })),
        [allEmployees],
    );

    useEffect(() => {
        if (data?.employee) {
            dispatch(getClubFromEmployee(data?.employee));
        }
    }, [data?.employee, dispatch]);

    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
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
        [data],
    );
    const addNewEvent = useCallback(
        (event, dayName) => {
            console.log(data?.availability, 'availability');
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
            const { end, oldEvent } = resized.event;
            const dayName = moment(end).format('dddd');
            if (isEventConflict(dayName, end)) {
                return;
            }
            setData((prevAccess) => ({
                ...prevAccess,
                events: prevAccess.events.map((item) => {
                    if (item.day === dayName && moment(oldEvent.end).toISOString() === item.end) {
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
    const getFormattedEvent = (item) => {
        let start = item.start;
        let end = item.end;
        let obj = {
            ...item,
            club: item.club,
            start,
            end,
        };

        return obj;
    };

    console.log(data);

    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            dispatch(
                addAvailability(data, () => {
                    history.goBack();
                }),
            );
        }
    };
    // const handleEventMount = (info) => {
    //     if (selectedClubId && info.event.extendedProps.clubId !== selectedClubId) {
    //         // Add styles for disabled events
    //         info.el.style.backgroundColor = 'lightgray';
    //         info.el.style.pointerEvents = 'none';
    //         info.el.style.opacity = 0.5;
    //     }
    // };

    return (
        <FormPage backText="Availability" backTo="/settings/employee">
            <CustomCard col={12} title="Availability">
                <CustomGridLayout>
                    <CustomAsyncReactSelect
                        name="employee"
                        field="fullName"
                        suggestions={suggestions}
                        options={employeeOptions}
                        placeholder="Search employee"
                        showLabel={false}
                        value={data?.employee}
                        onChange={handleChange}
                        extraClassName=" p-3 mt-3"
                        col={4}
                    />
                    <CustomDropDown name="club" options={employeeClubs} onChange={handleChange} data={data} />
                    <CustomDropDown name="trackAvailability" options={yesNoOptions} onChange={handleChange} data={data} />
                    <CustomCalenderInput name="fromDate" onChange={handleChange} data={data} col={3} />
                    <CustomCalenderInput name="toDate" onChange={handleChange} data={data} col={3} />
                    <CustomDropDown name="duration" options={durationTypeOptions} data={data} onChange={handleChange} col={3} />
                    <CustomDropDown name="availability" options={yesNoOptions} data={data} onChange={handleChange} col={3} />
                </CustomGridLayout>
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
                            // dayHeaderFormat: { weekday: 'long' },
                        },
                    }}
                    slotDuration={`00:${data?.duration}:00`}
                    headerToolbar=""
                    selectable={true}
                    expandRows={true}
                    editable={true}
                    eventStartEditable={false}
                    droppable={false}
                    eventResize={handleEventResize}
                    select={handleDateSelect}
                    // eventClick={deleteConfirm}
                    events={[
                        ...data.events.map((item) => ({
                            start: item.start,
                            end: item.end,
                            club: data?.club,
                            color: item.isAvailable ? '#8fdf82' : '#ff9f89',
                        })),
                    ]}
                    // eventDidMount={handleEventMount}
                />
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Copy Week" className="mx-2" loading={false} />
                <PrimaryButton
                    label="Clear Week"
                    className="mx-2"
                    onClick={() =>
                        setData({
                            ...data,
                            events: [],
                        })
                    }
                    loading={false}
                />
                <PrimaryButton label="Save" className="" onClick={handleSave} loading={false} />
            </CustomButtonGroup>
        </FormPage>
    );
};

export default AddAvailability;
