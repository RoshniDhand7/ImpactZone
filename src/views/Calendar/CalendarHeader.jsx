import React, { useEffect, useRef, useState } from 'react';
import { CustomCalenderInput, CustomDropDown } from '../../shared/Input/AllInputs';
import PrimaryButton from '../../shared/Button/CustomButton';
import { useHistory } from 'react-router-dom';
import { Menu } from 'primereact/menu';
import { calendarViewOptions } from '../../utils/dropdownConstants';
import { formatDate, formatDateRange } from './calendarHelper';
import calendarIcon from '../../assets/icons/calendar.png';

const CalendarHeader = ({ calendarRef, showDatePicker, setShowDatePicker, calendarDate, setCalendarDate }) => {
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
    let CalendarItems = [{ label: 'Recent Sessions' }, { label: 'Availability' }];

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

    return (
        <div className="w-full flex justify-content-between surface-ground mb-2 border-round-md">
            <div className="flex">
                <PrimaryButton onClick={handleToday} size="small" className="mx-2">
                    Today
                </PrimaryButton>
                <PrimaryButton icon="pi pi-angle-left" onClick={handlePrev} size="small" />
                <PrimaryButton icon="pi pi-angle-right" onClick={handleNext} size="small" />
                {/* <div className="my-auto font-bold mx-2">{calendarDate}</div> */}
                <div className="my-auto font-bold mx-2 cursor-pointer ">{calendarDate instanceof Date ? calendarDate.toLocaleDateString() : calendarDate}</div>
                <img
                    src={calendarIcon}
                    alt="cal1"
                    style={{ width: '30px', height: '30px' }}
                    className="my-auto cursor-pointer"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                />
            </div>

            <div className="flex justify-content-end col-6">
                <CustomDropDown
                    name="view"
                    col={3}
                    options={calendarViewOptions}
                    showLabel={false}
                    onChange={handleChangeView}
                    value={view}
                    extraClassName="my-auto"
                />
                <PrimaryButton className="mx-2" onClick={(e) => menu.current.toggle(e)} size="small">
                    Options
                </PrimaryButton>
                <PrimaryButton icon="pi pi-plus-circle " className="mx-2" size="small" onClick={() => history.push('/settings/schedule/classes/add')}>
                    Add Class
                </PrimaryButton>
                <Menu model={CalendarItems} popup ref={menu} />
            </div>
        </div>
    );
};

export default CalendarHeader;
