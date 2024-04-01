import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import CustomTable from '../../../../shared/Table/CustomTable';

const EventClasses = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(getLevels());
    }, [dispatch]);

    const { allLevels } = useSelector((state) => state.level);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/schedule/classes/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                // dispatch(deleteLevel(col._id, () => {}));
            },
            'Do you want to delete this Classes ?',
            position,
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Classes" linkTo="/settings/schedule/classes/add" />
            <CustomTable data={allLevels} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default EventClasses;
