import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCalendarEvents, getCalendarEvents, getCalendarLocations } from '../../redux/actions/Calendar/CalendarAction';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { CustomDropDown } from '../../shared/Input/AllInputs';
import PrimaryButton from '../../shared/Button/CustomButton';
import useEmployees from '../../hooks/Employees/useEmployees';
import { useHistory } from 'react-router-dom';
import { CustomTabMenu } from '../../shared/TabMenu/TabMenu';
import { Menu } from 'primereact/menu';
import moment from 'moment';
import { getDatesByDays } from '../../utils/commonFunctions';

export default function Calendar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const menu = useRef(null);

    useEffect(() => {
        dispatch(getCalendarEvents());
        dispatch(getCalendarLocations());
        dispatch(getAllCalendarEvents());
    }, [dispatch]);

    const { employeesDropdown } = useEmployees();

    const { events, locations, calendarEvents } = useSelector((state) => state.calendar);

    // console.log(events, locations, calendarEvents, 'Locations>>');
    const items = [
        { label: 'Employee', icon: 'pi pi-user' },
        { label: 'Location', icon: 'pi pi-chart-line' },
        { label: 'Resources', icon: 'pi pi-list' },
    ];

    const [data, setData] = useState({
        employee: '',
        location: '',
        resources: '',
    });

    const [tabIndex, setTabIndex] = useState(0);
    let CalendarItems = [
        { label: 'Book Events', command: () => history.push('/more/pos/receipts') },
        { label: 'Recent Sessions', command: () => history.push('/more/pos/drawers') },
        { label: 'Availability', command: () => history.push('/more/pos/drawers') },
    ];
    const [allEvents, setAllEvents] = useState([]);

    const CalendarEvents = () => {
        const events1 = [];

        calendarEvents?.forEach((item) => {
            const startDate = moment(item.startDate).format('YYYY-MM-DD');
            const endDate = moment(item.endDate).format('YYYY-MM-DD');

            item?.schedule?.forEach((scheduleItem) => {
                const matchedDates = getDatesByDays(startDate, endDate, scheduleItem.days);

                matchedDates.forEach((matchedDate) => {
                    const startDate = new Date(matchedDate.date);
                    events1.push({
                        // id: item._id,
                        title: `${item.event.name ?? ''}`,
                        backgroundColor: `#${item.event.boxColor}`,
                        color: '#fff',
                        start: `${startDate.toISOString().split('T')[0]}`,
                        end: `${startDate.toISOString().split('T')[0]}`,
                        textColor: `#${item.event.textColor}`,
                    });
                });
            });
        });

        // console.log(moment(item.startDate).format('YYYY-MM-DDTHH:mm:ss'), startDate.toISOString().split('T')[0], item, 'Start>>>');
        // events1.push({
        //     id: item._id,
        //     title: `${item.event.name ?? ''}`,
        //     backgroundColor: `#${item.event.boxColor}`,
        //     color: `#fff`,
        //     start: startDate.toISOString().split('T')[0],
        //     end: `${moment(item?.endDate).format('YYYY-MM-DD')}T00:00:00`,
        //     textColor: `#${item.event.textColor}`,
        // });

        console.log(events1, 'events1');

        return events1;
    };

    const ev = CalendarEvents();
    console.log(ev, 'ev');

    return (
        <div>
            <div className="flex justify-content-center align-items-center">
                <CustomTabMenu isActive={true} items={items} onChangeTabIndex={setTabIndex} />
                {tabIndex === 0 && (
                    <CustomDropDown name="employee" className="w-full p-1 ml-2" col={4} options={employeesDropdown} placeholder="Select Employee" />
                )}
                {tabIndex === 1 && (
                    <CustomDropDown name="location" className="w-full p-1 ml-2" col={4} options={employeesDropdown} placeholder="Select Location" />
                )}
                {tabIndex === 2 && (
                    <CustomDropDown name="resources" className="w-full p-1 ml-2" col={4} options={employeesDropdown} placeholder="Select Resources" />
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
                events={CalendarEvents()}
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
