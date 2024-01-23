import React, { useEffect } from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteLocationType, getLocationTypes } from '../../../../redux/actions/ScheduleSettings/locationTypeActions';

const LocationType = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLocationTypes());
    }, [dispatch]);

    const { allLocationType } = useSelector((state) => state.locationType);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'allowOverbooking', header: 'Allow Overbooking' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/schedule/location-type/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteLocationType(col._id, () => {}));
            },
            'Do you want to delete this Location Type ?',
            position,
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Location Type" linkTo="/settings/schedule/location-type/add" />
            <CustomTable data={allLocationType} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default LocationType;
