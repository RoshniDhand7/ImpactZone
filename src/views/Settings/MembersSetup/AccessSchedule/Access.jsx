import React, { useEffect, useRef, useState } from 'react';
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
    const [access, setAccess] = useState({
        duration: 30,
        schedule: [],
    });
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

    const handleDateSelect = (selectInfo) => {
        if (selectInfo.view.type === 'timeGridWeek') {
            const dayName = moment(selectInfo.start).format('dddd');
            selectInfo.view.calendar.unselect();
            const newEvent = {
                start: selectInfo.start.toISOString(),
                end: selectInfo.end.toISOString(),
            };
            const calendarApi = selectInfo.view.calendar;
            getSchedule(newEvent, dayName);
            calendarApi.addEvent(newEvent);
        }
    };
    const getSchedule = (event, dayName) => {
        setAccess((prevAccess) => ({
            ...prevAccess,
            schedule: [
                ...prevAccess.schedule,
                {
                    day: dayName,
                    startTime: event.start,
                    endTime: event.end,
                },
            ],
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

    const handleDeleteEvent = (e) => {
        const deletedEventStartTime = moment(e.event.start).toISOString();
        const deletedEventEndTime = moment(e.event.end).toISOString();

        setAccess((prevAccess) => ({
            ...prevAccess,
            schedule: prevAccess.schedule.filter(
                (item) => !(moment(item.startTime).toISOString() === deletedEventStartTime && moment(item.endTime).toISOString() === deletedEventEndTime),
            ),
        }));
    };

    const checkIsEventPresent = (day, newEventEndtime) => {
        return access.schedule.some(
            (sc) => day === sc.day && newEventEndtime.toISOString() > sc.startTime && day === sc.day && newEventEndtime.toISOString() <= sc.endTime,
        );
    };
    const handleEventResize = (resized) => {
        const dayName = moment(resized.event.end).format('dddd');
        const checkIsEventAlreadyPresent = checkIsEventPresent(dayName, resized.event.end);

        if (checkIsEventAlreadyPresent) {
            return setAccess({ ...access });
        }

        access.schedule.map((item) => {
            if (item.day === dayName && resized.oldEvent.end.toISOString() === item.endTime) {
                item.endTime = resized.event.end.toISOString();
            }
            return item;
        });
        setAccess({ ...access });
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
                eventResourceEditable={false}
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
