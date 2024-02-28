import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';

const Access = () => {
    const [accessSchedulesForm, setAccessSchedulesForm] = useState({
        isActive: true,
        name: '',
        shortName: '',
        color: '#00000',
        description: '',
        schedule: [],
    });
    const calendarRef = useRef(null);
    const handleDateSelect = (selectInfo) => {
        if (selectInfo.view.type === 'timeGridWeek') {
            selectInfo.view.calendar.unselect();

            const dayName = moment(selectInfo.start).format('dddd');
            const dayShortName = moment(selectInfo.start).format('dddd').substring(0, 3);
            const checkIsEventAlreadyPresent = checkIsEventPresent(dayName, selectInfo.end);
            console.log(checkIsEventAlreadyPresent);
            if (checkIsEventAlreadyPresent) return;

            const newEvent = {
                start: selectInfo.start.toISOString(),
                end: selectInfo.end.toISOString(),
            };

            let calendarApi = calendarRef.current.getApi();

            getSchedule(newEvent, dayName, dayShortName);
            calendarApi.addEvent(newEvent);
        }
    };
    const getSchedule = (event, dayName, shortName) => {
        setAccessSchedulesForm({
            ...accessSchedulesForm,
            schedule: [
                ...accessSchedulesForm.schedule,
                {
                    day: dayName,
                    shortName: shortName,
                    startTime: event.start,
                    endTime: event.end,
                },
            ],
        });
    };

    const onDeleteEvent = (e) => {
        const dayName = moment(e.event.end).format('dddd');

        setAccessSchedulesForm({
            ...accessSchedulesForm,
            schedule: accessSchedulesForm.schedule.filter(
                (item) => e.event.start.toISOString() !== item.startTime && e.event.end.toISOString() !== item.endTime,
            ),
        });
    };

    const checkIsEventPresent = (day, newEventEndtime) => {
        return accessSchedulesForm.schedule.some(
            (sc) => day === sc.day && newEventEndtime.toISOString() > sc.startTime && day === sc.day && newEventEndtime.toISOString() <= sc.endTime,
            // ||
            // (day === sc.day &&
            //   newEventEndtime.toISOString() > sc.startTime &&
            //   day === sc.day &&
            //   newEventEndtime.toISOString() > sc.endTime)
        );
    };
    const handleEventResize = (resized) => {
        const dayName = moment(resized.event.end).format('dddd');
        const checkIsEventAlreadyPresent = checkIsEventPresent(dayName, resized.event.end);

        if (checkIsEventAlreadyPresent) {
            return setAccessSchedulesForm({ ...accessSchedulesForm });
        }

        accessSchedulesForm.schedule.map((item) => {
            if (item.day === dayName && resized.oldEvent.end.toISOString() === item.endTime) {
                item.endTime = resized.event.end.toISOString();
            }
            return item;
        });
        setAccessSchedulesForm({ ...accessSchedulesForm });
    };

    console.log(accessSchedulesForm);

    return (
        <>
            <FullCalendar
                ref={calendarRef}
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                initialDate={'2023-10-01'}
                views={{
                    timeGridWeek: {
                        type: 'timeGrid',
                        dayHeaderFormat: { weekday: 'long' },
                    },
                }}
                selectable={true}
                expandRows={true}
                editable={true}
                eventStartEditable={false}
                droppable={false}
                eventResize={handleEventResize}
                select={handleDateSelect}
                // eventClick={deleteConfirm}
                events={[
                    ...accessSchedulesForm.schedule.map((item) => ({
                        start: item.startTime,
                        end: item.endTime,
                    })),
                ]}
            />
        </>
    );
};

export default Access;
