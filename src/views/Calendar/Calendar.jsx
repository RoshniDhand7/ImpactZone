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
import { useHistory } from 'react-router-dom';
import { buildEventTitle, formatEventTime } from '../../utils/commonFunctions';
import BookEvent from './BookEvent';
import CalendarHeader from './CalendarHeader';
import CalendarSideBar from '../../assets/icons/calendarSidebar.png';
import { CustomCalenderInput } from '../../shared/Input/AllInputs';
import { formatDate, formatDateRange } from './calendarHelper';
import { CustomGridLayout } from '../../shared/Cards/CustomCard';
import { Calendar } from 'primereact/calendar';

export default function CalendarComponent() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(getCalendarEvents());
        dispatch(getCalendarLocations());
        dispatch(getAllCalendarEvents());
        dispatch(getCalendarResources());
        dispatch(getAllCalendarBooking());
    }, [dispatch]);

    const calendarRef = useRef();
    const { bookedEvents } = useSelector((state) => state.calendar);

    console.log(bookedEvents, 'bookedEvents');

    const CalendarEvents = () => {
        const events1 = [];
        bookedEvents?.forEach((item) => {
            if (item.type === 'BOOKING') {
                const { start, end } = formatEventTime(item.eventDate, item.startTime, item.duration);
                events1.push({
                    id: item._id,
                    title: buildEventTitle(item.event, item?.staff, item.duration),
                    // title: [item.event, `${item.duration} minutes`, item.staff?.firstName].join('\n'),
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
                    title: buildEventTitle(item.event, item?.staff, item.duration),
                    backgroundColor: `#${item?.event?.boxColor}`,
                    color: '#fff',
                    start,
                    end,
                    textColor: `#${item?.event?.textColor}`,
                });
            }
        });

        return events1;
    };

    const renderEventContent = (eventInfo) => {
        const titleLines = eventInfo.event.title.split('\n');
        return (
            <div className="calendar-container">
                <div>
                    {titleLines.map((line, index) => (
                        <div key={index}>{line}</div>
                    ))}
                </div>
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

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [calendarDate, setCalendarDate] = useState(null);
    const handleDateSelect = (e) => {
        const { value } = e.target;
        if (!(value instanceof Date)) {
            console.error('Invalid date selected');
            return;
        }
        setShowDatePicker(!showDatePicker);
        setDate(value);
        const calendarApi = calendarRef?.current?.getApi();
        calendarApi.gotoDate(value);
    };

    useEffect(() => {
        const calendarApi = calendarRef?.current?.getApi();
        if (calendarApi) {
            const { type, activeStart, activeEnd } = calendarApi.view;
            if (type === 'timeGridWeek') {
                const formattedRange = formatDateRange(activeStart, new Date(activeEnd - 1));
                console.log(`Week Range: ${formattedRange}`);
                setCalendarDate(formattedRange);
            } else if (type === 'timeGridDay') {
                const formattedDate = formatDate(activeStart);
                console.log(`Day Date: ${formattedDate}`);
                setCalendarDate(formattedDate);
            }
        }
    }, [showDatePicker]);

    console.log(showDatePicker, 'showDatePicker');

    return (
        <>
            <div className="flex justify-content-between ">
                <img
                    src={CalendarSideBar}
                    alt="cal"
                    style={{ width: '75px', height: '75px' }}
                    className="cursor-pointer"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <CalendarHeader
                    calendarRef={calendarRef}
                    showDatePicker={showDatePicker}
                    setShowDatePicker={setShowDatePicker}
                    calendarDate={calendarDate}
                    setCalendarDate={setCalendarDate}
                />
            </div>
            {showDatePicker && (
                <Calendar onChange={handleDateSelect} value={date} inline className="absolute z-5 w-4" style={{ marginLeft: '500px' }} showLabel={false} />
            )}

            <div className="flex">
                {isSidebarOpen && (
                    <div className="mx-2 sidebar">
                        <div className="p-">
                            <h3>Member Details</h3>
                            <BookEvent />
                        </div>
                    </div>
                )}

                <div className="w-full relative">
                    <FullCalendar
                        height="100vh"
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={false}
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
                        buttonText={{ today: 'Today', week: 'Week', day: 'Day' }}
                        ref={calendarRef}
                        slotDuration="00:15:00"
                    />
                </div>
            </div>
        </>
    );
}
