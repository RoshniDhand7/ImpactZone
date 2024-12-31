import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCalendarEvents, getCalendarLocations } from '../../redux/actions/Calendar/CalendarAction';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { CustomFilterCard } from '../../shared/Cards/CustomCard';
import { CustomDropDown } from '../../shared/Input/AllInputs';
import PrimaryButton from '../../shared/Button/CustomButton';
import useEmployees from '../../hooks/Employees/useEmployees';

export default function Calendar() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCalendarEvents());
        dispatch(getCalendarLocations());
    }, [dispatch]);

    const { employeesDropdown } = useEmployees();

    const { events, locations } = useSelector((state) => state.calendar);

    console.log(events, locations, 'Locations>>');
    return (
        <div>
            <CustomFilterCard buttonTitle="Book" contentPosition="end">
                <div className="flex">
                    <CustomDropDown name="" className="w-full p-1" col={6} options={employeesDropdown} placeholder="Select Employee" />
                    <div className="text-end w-full">
                        <PrimaryButton icon="pi pi-plus-circle">Add Class</PrimaryButton>
                    </div>
                </div>
            </CustomFilterCard>
            <FullCalendar
                height="75vh"
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                views={{
                    dayGridMonth: {
                        titleFormat: { year: 'numeric', month: 'short', day: '2-digit' },
                    },
                    timeGridWeek: {
                        titleFormat: { year: 'numeric', month: 'short', day: '2-digit' },
                    },
                    timeGridDay: {
                        titleFormat: { year: 'numeric', month: 'short', day: '2-digit' },
                    },
                }}
                initialView="timeGridWeek"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                // select={handleDateClick}
                // eventClick={handleEventClick}
                // eventsSet={(events) => setCurrentEvents(events)}
                initialEvents={[
                    {
                        id: '12315',
                        title: 'All-day event',
                        date: '2024-12-14',
                    },
                    {
                        id: '5123',
                        title: 'Timed event',
                        date: '2024-12-28',
                    },
                ]}
            />
        </div>
    );
}
