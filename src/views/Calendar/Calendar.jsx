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
import moment from 'moment';
import { getDatesByDays } from '../../utils/commonFunctions';
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

        calendarEvents?.forEach((item) => {
            const startDate = moment(item.startDate).format('YYYY-MM-DD');
            const endDate = moment(item.endDate).format('YYYY-MM-DD');

            console.log('events>>', item);

            item?.schedule?.forEach((scheduleItem) => {
                const matchedDates = getDatesByDays(startDate, endDate, scheduleItem.days);

                matchedDates.forEach((matchedDate) => {
                    const startDate = new Date(matchedDate.date);
                    let start = `${startDate.toISOString().split('T')[0]}T${scheduleItem.startTime}:00`;
                    let end = moment(start);
                    end = end.add(scheduleItem.duration, 'minutes').format('YYYY-MM-DDTHH:mm:ss');
                    events1.push({
                        // id: item._id,
                        title: `${item.event.calanderDisplay?.includes('EVENT') ? item.event.name : ''}
                        \n ${item.event.calanderDisplay?.includes('DURATION') ? scheduleItem.duration + ' minutes' : ''}
                        \n ${item.event.calanderDisplay?.includes('LOCATION') ? item.location.name : ''}
                         \n ${item.event.calanderDisplay?.includes('EMPLOYEE_NAME') ? (item?.employee?.firstName ?? '') : ''}
                        \n${item.event.calanderDisplay?.includes('ENROLLED_MAX_ATTENDANCE') ? item.event.defaultMaxAttendes : ''}`,
                        backgroundColor: `#${item.event.boxColor}`,
                        color: '#fff',
                        start: start,
                        end: end,
                        textColor: `#${item.event.textColor}`,
                    });
                });
            });
        });

        console.log(events1, bookedEvents, 'events1');

        return events1;
    };

    const renderEventContent = (eventInfo) => {
        const titleLines = eventInfo.event.title.split('\n');
        return (
            <div>
                {titleLines.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
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
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                events={CalendarEvents()}
                eventContent={renderEventContent}
                // select={handleDateClick}
                // eventClick={handleEventClick}
                // eventsSet={(events) => setCurrentEvents(events)}
            />
        </div>
    );
}
