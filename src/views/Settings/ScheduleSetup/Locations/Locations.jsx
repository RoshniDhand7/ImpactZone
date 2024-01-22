import React, { useEffect } from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { deleteLevel, getLevels } from '../../../../redux/actions/ScheduleSettings/levelActions';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteLocationType } from '../../../../redux/actions/ScheduleSettings/locationTypeActions';
import { deleteLocation, getLocations } from '../../../../redux/actions/ScheduleSettings/locationsActions';

const Locations = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLocations());
    }, [dispatch]);

    const { allLocation } = useSelector((state) => state.locations);

    const columns = [
        { field: 'name', header: ' Location Name' },
        { field: 'locationType', header: 'Location Type' },
        { field: 'club', header: 'Club' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/schedule/locations/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteLocation(col._id, () => {}));
            },
            'Do you want to delete this Locations ?',
            position,
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Locations" linkTo="/settings/schedule/locations/add" />
            <CustomTable data={allLocation} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default Locations;
