import React, { useEffect, useRef, useState } from 'react';
import { CustomDropDown } from '../../shared/Input/AllInputs';
import PrimaryButton from '../../shared/Button/CustomButton';
import { useHistory } from 'react-router-dom';
import { Menu } from 'primereact/menu';
import { calendarViewOptions } from '../../utils/dropdownConstants';

const CalendarHeader = ({ calendarRef, setOpenBookEvent }) => {
    const history = useHistory();
    const menu = useRef(null);
    const [view, setView] = useState('week');

    useEffect(() => {
        handleToday();
    }, []);

    const handleChangeView = ({ value }) => {
        const calendarAPI = calendarRef?.current?.getApi();
        if (calendarAPI) {
            const newView = value === 'day' ? 'timeGridDay' : value === 'week' ? 'timeGridWeek' : null;
            if (newView) {
                calendarAPI.changeView(newView);
                updateCalendarDate(calendarAPI.view);
            }
        }
        setView(value);
    };
    let CalendarItems = [{ label: 'Book Events', command: () => setOpenBookEvent(true) }, { label: 'Recent Sessions' }, { label: 'Availability' }];

    const updateCalendarDate = (view) => {
        if (!view) return;

        const { type, activeStart, activeEnd } = view;
        if (type === 'timeGridWeek') {
            const formattedRange = formatDateRange(activeStart, new Date(activeEnd - 1));
            console.log(`Week Range: ${formattedRange}`);
            setCalendarDate(formattedRange);
        } else if (type === 'timeGridDay') {
            const formattedDate = formatDate(activeStart);
            console.log(`Day Date: ${formattedDate}`);
            setCalendarDate(formattedDate);
        }
    };
    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    };

    const formatDateRange = (startDate, endDate) => {
        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    };
    const handleNavigation = (action) => {
        const calendarApi = calendarRef?.current?.getApi();
        if (!calendarApi) return;

        if (action === 'today') {
            calendarApi.gotoDate(new Date());
            updateCalendarDate(calendarApi.view);
        } else if (action === 'prev') {
            calendarApi.prev();
        } else if (action === 'next') {
            calendarApi.next();
        }

        updateCalendarDate(calendarApi.view);
    };
    const handleToday = () => handleNavigation('today');
    const handlePrev = () => handleNavigation('prev');
    const handleNext = () => handleNavigation('next');

    const [calendarDate, setCalendarDate] = useState(null);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: '#f8f9fa',
                borderRadius: '5px',
                marginBottom: '4px',
            }}
        >
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>{calendarDate}</span>
            <div className="col-6 flex justify-content-end">
                <CustomDropDown name="view" col={3} options={calendarViewOptions} showLabel={false} onChange={handleChangeView} value={view} />
                <PrimaryButton onClick={handleToday}>Today</PrimaryButton>
                <span className="p-buttonset">
                    <PrimaryButton icon="pi pi-angle-left" onClick={handlePrev} />
                    <PrimaryButton icon="pi pi-angle-right" onClick={handleNext} />
                </span>

                <PrimaryButton className=" ml-3" onClick={(e) => menu.current.toggle(e)}>
                    Options
                </PrimaryButton>
                <PrimaryButton icon="pi pi-plus-circle " className=" ml-3" onClick={() => history.push('/settings/schedule/classes/add')} size="small">
                    Add Class
                </PrimaryButton>
                <Menu model={CalendarItems} popup ref={menu} />
            </div>
        </div>
    );
};

export default CalendarHeader;
