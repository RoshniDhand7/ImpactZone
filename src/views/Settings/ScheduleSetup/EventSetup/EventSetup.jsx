import React, { useState, useEffect } from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteScheduledEvent, getEvents } from '../../../../redux/actions/ScheduleSettings/eventsActions';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';

const EventSetup = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    const { allEvents } = useSelector((state) => state.event);
    const modifiedEvents = allEvents?.map((item) => ({
        ...item,
        internalUse: item.internalUse === 'true' ? true : false,
    }));

    console.log(modifiedEvents);

    const columns = [
        { field: 'internalUse', header: 'Internal Use' },
        { field: 'eventType', header: 'Type' },
        { field: 'name', header: 'Name' },
        { field: 'locationType', header: 'Location Type' },
        { field: 'color', header: 'Mapped to Services' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/schedule/events/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteScheduledEvent(col._id, () => {}));
            },
            'Do you want to delete this Event ?',
            position,
        );
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Events" linkTo="/settings/schedule/events/add" />
            <CustomTable data={modifiedEvents} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default EventSetup;
