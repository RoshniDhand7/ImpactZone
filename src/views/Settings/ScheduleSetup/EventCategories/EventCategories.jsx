import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteEventCategory, getEventCategories } from '../../../../redux/actions/ScheduleSettings/eventCategoryAction';

const EventCategories = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEventCategories());
    }, [dispatch]);

    const { allEventCategories } = useSelector((state) => state.eventCategory);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/schedule/event-categories/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteEventCategory(col._id, () => {}));
            },
            'Do you want to delete this Event Category ?',
            position,
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Event Categories" linkTo="/settings/schedule/event-categories/add" />
            <CustomTable data={allEventCategories} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default EventCategories;
