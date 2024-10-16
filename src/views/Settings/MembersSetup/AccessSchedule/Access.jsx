import React, { useCallback, useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import { CustomDropDown } from '../../../../shared/Input/AllInputs';
import { durationTypeOptions } from '../../../../utils/dropdownConstants';
import PrimaryButton, { CustomButtonGroup } from '../../../../shared/Button/CustomButton';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editAccessSchedule, getAccessSchedule } from '../../../../redux/actions/MembersSettings/accessSchedule';

const Access = () => {
    const [access, setAccess] = useState({ duration: 30, schedule: [] });
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const calendarRef = useRef(null);
    const handleChange = ({ name, value }) => {
        setAccess((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (id) {
            dispatch(
                getAccessSchedule(id, (data) => {
                    setAccess(() => ({
                        duration: data.duration ?? 30,
                        schedule: data.schedule ?? [],
                    }));
                }),
            );
        }
    }, [id, dispatch]);

    const handleDateSelect = useCallback((selectInfo) => {
        const { start, end, view } = selectInfo;
        const dayName = moment(start).format('dddd');

        if (view.type === 'timeGridWeek') {
            const newEvent = { start: start.toISOString(), end: end.toISOString() };
            addNewEvent(newEvent, dayName);
            view.calendar.unselect();
            view.calendar.addEvent(newEvent);
        }
    }, []);
    const addNewEvent = (event, dayName) => {
        setAccess((prevAccess) => ({
            ...prevAccess,
            schedule: [...prevAccess.schedule, { day: dayName, startTime: event.start, endTime: event.end }],
        }));
    };

    const deleteConfirm = (e, position) => {
        confirmDelete(
            () => {
                handleDeleteEvent(e);
            },
            'Do you want to delete this Access ?',
            position,
        );
    };
    const handleDeleteEvent = useCallback((event) => {
        const { start, end } = event.event;
        const deletedEventStartTime = moment(start).toISOString();
        const deletedEventEndTime = moment(end).toISOString();

        setAccess((prevAccess) => ({
            ...prevAccess,
            schedule: prevAccess.schedule.filter((item) => item.startTime !== deletedEventStartTime || item.endTime !== deletedEventEndTime),
        }));
    }, []);

    const handleEventResize = useCallback(
        (resized) => {
            const { end, oldEvent } = resized.event;
            const dayName = moment(end).format('dddd');
            if (isEventConflict(dayName, end)) {
                return;
            }
            setAccess((prevAccess) => ({
                ...prevAccess,
                schedule: prevAccess.schedule.map((item) => {
                    if (item.day === dayName && moment(oldEvent.end).toISOString() === item.endTime) {
                        return { ...item, endTime: end.toISOString() };
                    }
                    return item;
                }),
            }));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [access],
    );
    const isEventConflict = (day, endTime) => {
        return access.schedule.some((sc) => day === sc.day && moment(endTime).toISOString() > sc.startTime && moment(endTime).toISOString() <= sc.endTime);
    };

    const handleAllAcess = () => {
        if (calendarRef.current) {
            const startDate = calendarRef.current.getApi().view.currentStart;
            const momentStartDate = moment(startDate);
            const updatedForm = { ...access };
            updatedForm.schedule = [];

            for (let i = 0; i < 7; i++) {
                const currentDate = momentStartDate.clone().add(i, 'days');
                updatedForm.schedule.push({
                    day: currentDate.format('dddd'),
                    startTime: currentDate.startOf('day').format(),
                    endTime: currentDate.endOf('day').format(),
                });
            }
            setAccess(updatedForm);
        } else {
            console.error('Calendar reference not available.');
        }
    };

    const handleSave = () => {
        if (id) {
            dispatch(editAccessSchedule(id, access, setLoading, history));
        }
    };

    return (
        <>
            <CustomDropDown name="duration" options={durationTypeOptions} data={access} onChange={handleChange} />
            <FullCalendar
                ref={calendarRef}
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                selectOverlap={false}
                views={{
                    timeGridWeek: {
                        type: 'timeGrid',
                        dayHeaderFormat: { weekday: 'long' },
                    },
                }}
                slotDuration={`00:${access.duration}:00`}
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
                    ...access.schedule.map((item) => ({
                        start: item.startTime,
                        end: item.endTime,
                    })),
                ]}
            />
            <CustomButtonGroup>
                <PrimaryButton label="All Access" onClick={handleAllAcess} className="mx-2" loading={loading} />
                <PrimaryButton
                    label="No Access"
                    className="mx-2"
                    onClick={() =>
                        setAccess({
                            ...access,
                            schedule: [],
                        })
                    }
                    loading={loading}
                />
                <PrimaryButton label="Save" className="" onClick={handleSave} loading={loading} />
            </CustomButtonGroup>
        </>
    );
};

export default Access;
