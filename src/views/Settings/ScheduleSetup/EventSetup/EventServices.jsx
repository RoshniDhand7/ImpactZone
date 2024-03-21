import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { useParams } from 'react-router-dom';
import { getEvents } from '../../../../redux/actions/ScheduleSettings/eventsActions';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../../../shared/Table/CustomTable';

const EventServices = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);
    const columns = [
        { field: 'unitPrice', header: 'Catalog Price' },
        { field: 'name', header: 'Name' },
        { field: 'size', header: 'Size' },
        { field: 'isActive', header: 'Status' },
    ];

    const { allEvents } = useSelector((state) => state.event);

    console.log(allEvents);

    const findId = allEvents.findIndex((item) => item._id === id);
    console.log(findId);
    return (
        <>
            <CustomFilterCard buttonTitle="Add Services" linkTo={`/settings/schedule/events/edit/${id}/services/add`} />
            <CustomTable data={allEvents?.[findId]?.services} columns={columns} />
        </>
    );
};

export default EventServices;
