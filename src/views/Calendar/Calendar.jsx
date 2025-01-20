import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllCalendarBooking,
    getAllCalendarEvents,
    getCalendarEvents,
    getCalendarLocations,
    getCalendarResources,
} from '../../redux/actions/Calendar/CalendarAction';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CustomDropDown } from '../../shared/Input/AllInputs';
import PrimaryButton from '../../shared/Button/CustomButton';
import useEmployees from '../../hooks/Employees/useEmployees';
import { useHistory } from 'react-router-dom';
import { CustomTabMenu } from '../../shared/TabMenu/TabMenu';
import { Menu } from 'primereact/menu';
import { buildEventTitle, formatEventTime } from '../../utils/commonFunctions';
import BookEvent from './BookEvent';

export default function Calendar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const menu = useRef(null);

    useEffect(() => {
        dispatch(getCalendarEvents());
        dispatch(getCalendarLocations());
        dispatch(getAllCalendarEvents());
        dispatch(getCalendarResources());
        dispatch(getAllCalendarBooking());
    }, [dispatch]);

    const { employeesDropdown } = useEmployees();

    const { calendarLocationDropdown, calendarEvents, bookedEvents, calendarResourcesDropdown } = useSelector((state) => state.calendar);

    const items = [
        { label: 'Employee', icon: 'pi pi-user' },
        { label: 'Location', icon: 'pi pi-chart-line' },
        { label: 'Resources', icon: 'pi pi-list' },
    ];

    const [openBookEvent, setOpenBookEvent] = useState(false);

    // const [data, setData] = useState({
    //     employee: '',
    //     location: '',
    //     resources: '',
    // });

    const [tabIndex, setTabIndex] = useState(0);
    let CalendarItems = [{ label: 'Book Events', command: () => setOpenBookEvent(true) }, { label: 'Recent Sessions' }, { label: 'Availability' }];
    // const [allEvents, setAllEvents] = useState([]);

    const CalendarEvents = () => {
        const events1 = [];
        bookedEvents.forEach((item) => {
            if (item.type === 'BOOKING') {
                const { start, end } = formatEventTime(item.eventDate, item.startTime, item.duration);
                events1.push({
                    id: item._id,
                    // title: buildEventTitle(item.event, item?.staff, item.location[0]?.name, item.duration, item.calanderDisplay),
                    title: [item.event, `${item.duration} minutes`, item.staff?.firstName].join('\n'),
                    backgroundColor: '#252b42',
                    color: '#fff',
                    start,
                    end,
                    textColor: '#fff',
                });
                // }
            } else {
                const { start, end } = formatEventTime(item.eventDate, item.startTime, item.duration);
                events1.push({
                    id: item._id,
                    title: buildEventTitle(item.event, item?.staff, item.location[0]?.name, item.duration, item.calanderDisplay),
                    backgroundColor: `#${item.boxColor}`,
                    color: '#fff',
                    start,
                    end,
                    textColor: `#${item.textColor}`,
                });
            }
        });

        return events1;
    };

    const renderEventContent = (eventInfo) => {
        const titleLines = eventInfo.event.title.split('\n');
        return (
            <div className="calendar-container">
                {/* Event Title */}
                <div>
                    {titleLines.map((line, index) => (
                        <div key={index}>{line}</div>
                    ))}
                </div>

                {/* Button at Bottom-Right */}
                <button
                    onClick={() => history.push(`calender/events/${eventInfo.event.id}`)}
                    style={{
                        background: 'none',
                        border: 'none',
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        cursor: 'pointer',
                        color: 'white',
                        padding: '2px',
                    }}
                >
                    <i className="pi pi-pencil"></i>
                </button>
            </div>
        );
    };

    return (
        <div>
            <div className="flex justify-content-center align-items-center">
                <CustomTabMenu isActive={true} items={items} onChangeTabIndex={setTabIndex} />
                {tabIndex === 0 && (
                    <CustomDropDown name="employee" className="w-full p-1 ml-2" col={4} options={employeesDropdown} placeholder="Select Employee" />
                )}
                {tabIndex === 1 && (
                    <CustomDropDown name="location" className="w-full p-1 ml-2" col={4} options={calendarLocationDropdown} placeholder="Select Location" />
                )}
                {tabIndex === 2 && (
                    <CustomDropDown name="resources" className="w-full p-1 ml-2" col={4} options={calendarResourcesDropdown} placeholder="Select Resources" />
                )}
                <div className="mt-3">
                    <PrimaryButton icon="pi pi-plus-circle " className="mt-3 ml-3" onClick={() => history.push('/settings/schedule/classes/add')}>
                        Add Class
                    </PrimaryButton>
                    <PrimaryButton className="ml-3 mt-3" onClick={(e) => menu.current.toggle(e)}>
                        Options
                    </PrimaryButton>
                </div>
            </div>
            <Menu model={CalendarItems} popup ref={menu} />

            <BookEvent openBookEvent={openBookEvent} setOpenBookEvent={setOpenBookEvent} />

            <FullCalendar
                height="75vh"
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay',
                }}
                views={{
                    timeGridWeek: {
                        titleFormat: { year: 'numeric', month: 'short', day: '2-digit' },
                    },
                    timeGridDay: {
                        titleFormat: { year: 'numeric', month: 'short', day: '2-digit' },
                    },
                }}
                initialView={'timeGridWeek'}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                events={CalendarEvents()}
                eventContent={renderEventContent}
                editable={false}
                // select={handleDateClick}
                // eventClick={handleEventClick}
                // eventsSet={(events) => setCurrentEvents(events)}
            />
        </div>
    );
}
