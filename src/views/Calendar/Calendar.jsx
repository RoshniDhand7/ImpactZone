import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteEvent,
    getAllCalendarBooking,
    getAllCalendarEvents,
    getCalendarBooking,
    getCalendarEvents,
    getCalendarLocations,
    getCalendarResources,
} from '../../redux/actions/Calendar/CalendarAction';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useHistory } from 'react-router-dom';
import { buildEventTitle, confirmDelete, formatEventTime } from '../../utils/commonFunctions';
import BookEvent from './BookEvent';
import CalendarHeader from './CalendarHeader';
import CalendarSideBar from '../../assets/icons/calendarSidebar.png';
import { formatDate, formatDateRange } from './calendarHelper';
import { Calendar } from 'primereact/calendar';
import { OverlayPanel } from 'primereact/overlaypanel';
import moment from 'moment';

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
                    backgroundColor: '#252b42',
                    color: '#fff',
                    start,
                    end,
                    textColor: '#fff',
                });
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
        const title = eventInfo.event.title;

        return (
            <div className="calendar-container" style={{ height: '40px' }}>
                <div
                    style={{
                        fontSize: '10px',
                        fontWeight: '200',
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                    }}
                >
                    {title}
                </div>
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
    const [eventId, setEventId] = useState(null);

    const overlayRef = useRef(null);

    const handleEventClick = (clickInfo) => {
        console.log(clickInfo, 'clickInfo');
        dispatch(getCalendarBooking(clickInfo.event.id));
        // overlayRef.current.toggle('');
        clickInfo.el.addEventListener('click', (event) => {
            overlayRef?.current?.show(event);
        });
        setEventId(clickInfo.event.id);
        clickInfo.el.click();
        // overlayRef.current.toggle('');
    };
    const { calendarEvent } = useSelector((state) => state.calendar);

    const handleDelete = (position) => {
        confirmDelete(
            () => {
                dispatch(
                    deleteEvent(eventId, () => {
                        dispatch(getAllCalendarBooking());
                    }),
                );
            },
            'Do you want to delete this Event ?',
            position,
        );
    };

    console.log(calendarEvent, 'calendarEvent');

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
                        eventClick={handleEventClick}
                    />
                </div>
                {overlayRef ? (
                    <OverlayPanel className="p-0 eventshow-panel" ref={overlayRef} dismissable={true} style={{ width: '20rem' }}>
                        <div className="p-0 mx-auto " style={{ height: '8rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginBottom: '6px', marginTop: '' }}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <i className="pi pi-pencil text-blue-400" onClick={() => history.push(`calender/events/${eventId}`)}></i>
                                    <i className="pi pi-trash" onClick={handleDelete}></i>
                                    <i className="pi pi-times text-red-400" onClick={(e) => overlayRef?.current?.hide(e)}></i>
                                </div>
                            </div>
                            <div className="flex justify-content-between align-items-center">
                                <div
                                    className="shadow-1 w-1 h-1rem  "
                                    style={{ backgroundColor: `#${calendarEvent?.type === 'CLASS' ? calendarEvent?.event?.boxColor : '252b42'}` }}
                                ></div>
                                <div className="text-sm font-semibold  text-sm   ">{calendarEvent?.event?.name}</div>&nbsp;
                            </div>
                            <div className="flex mt-2 mb-1 align-items-center">
                                <i className="pi pi-calendar mr-5 "></i>
                                <div className="font-semibold text-sm ">{moment(calendarEvent?.eventDate).format('dddd, D MMMM')}</div>
                            </div>
                            <div className="flex mb-1 align-items-center">
                                <i className="pi pi-clock mr-5"></i>
                                <div className="font-semibold text-sm ">{calendarEvent?.duration} minutes</div>
                            </div>
                            <div className="flex mb-1 align-items-center">
                                <i className="pi pi-user mr-5"></i>
                                <div className="font-semibold  text-sm">
                                    {calendarEvent?.staff?.firstName}
                                    {calendarEvent?.staff?.MI}
                                    {calendarEvent?.staff?.lastName}
                                </div>
                            </div>
                        </div>
                    </OverlayPanel>
                ) : null}
            </div>
        </>
    );
}
