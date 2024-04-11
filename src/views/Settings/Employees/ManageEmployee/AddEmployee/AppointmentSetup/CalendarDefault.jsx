import React, { useEffect, useState } from 'react';
import { getEvents } from '../../../../../../redux/actions/ScheduleSettings/eventsActions';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../../../../../shared/Table/CustomTable';
import { getEmployeeAppointmentPay } from '../../../../../../redux/actions/EmployeeSettings/appointmentAction';
import { useParams } from 'react-router-dom';
import { CalendarDefaultSorting } from '../../../../../../redux/actions/EmployeeSettings/employeesAction';

const CalendarDefault = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getEvents());
        dispatch(getEmployeeAppointmentPay(id, 'PAY'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    let { allEvents } = useSelector((state) => state.event);
    let { isAppointmentLevel } = useSelector((state) => state?.employees);

    const columns = [
        { field: 'name', header: 'Event' },
        { field: 'eventType', header: 'Event Type' },
    ];

    const [reorderd, setReorderd] = useState([]);
    useEffect(() => {
        if (allEvents) {
            const filteredEvents = allEvents?.filter((item) => item?.eventLevel?.includes(isAppointmentLevel) && item.eventType === 'Appointments');

            setReorderd(filteredEvents);
        }
    }, [isAppointmentLevel, allEvents]);

    const handleRowReorder = (reorderedData) => {
        setReorderd(reorderedData.value);
        dispatch(
            CalendarDefaultSorting(reorderedData.value, () => {
                dispatch(getEvents());
            }),
        );
    };

    return (
        <>
            <div className="shadow-2 bg-blue-300 p-3 mb-2  text-white">Please Click & hold the icon to drag & Sort the events</div>
            <CustomTable data={reorderd} columns={columns} reorderableRows={true} onRowReorder={handleRowReorder} />
        </>
    );
};

export default CalendarDefault;
