import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import CustomTable from '../../../../shared/Table/CustomTable';
import { deleteClasses, getEventClasses } from '../../../../redux/actions/ScheduleSettings/eventClassesAction';

const EventClasses = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEventClasses());
    }, [dispatch]);

    const { allClasses } = useSelector((state) => state.eventClasses);

    const columns = [
        { field: 'event', header: 'Name' },
        { field: 'classLocation', header: 'Location' },
        { field: 'days', body: (r) => r.schedule[0]?.days?.join(','), header: 'Schedule' },
        { field: 'instructor', body: (r) => r.instructor[0]?.firstName, header: 'Instructor' },
        { field: 'totalCapacity', header: 'Capacity' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/schedule/classes/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteClasses(col._id, () => {}));
            },
            'Do you want to delete this Classes ?',
            position,
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Classes" linkTo="/settings/schedule/classes/add" />
            <CustomTable data={allClasses} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default EventClasses;
