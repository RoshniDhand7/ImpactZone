import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import CustomTable from '../../../../shared/Table/CustomTable';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import ActiveFilter from '../../../../components/Filters/ActiveFilter';
import { deleteClasses, getEventClasses } from '../../../../redux/actions/Settings/ScheduleSetup/eventClassesAction';
import { types } from '../../../../redux/types/types';

const EventClasses = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEventClasses());
        return () => {
            dispatch({
                type: types.SETTINGS.SCHEDULE_SETUP.CLASS,
                payload: [],
            });
        };
    }, [dispatch]);

    const classes = useSelector((state) => state?.settings?.schedule?.classes);

    const columns = [
        { field: 'event', header: 'Name' },
        { field: 'classLocation', header: 'Location' },
        { field: 'days', body: (r) => (r?.schedule?.length > 0 ? r?.schedule?.map((item) => item.days?.join(',')) : '-'), header: 'Schedule' },
        { field: 'instructor', body: (r) => (r?.instructor?.length > 0 ? r?.instructor?.map((item) => item.firstName) : '-'), header: 'Instructor' },
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

    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(classes);

    return (
        <>
            <CustomFilterCard buttonTitle="Add Classes" linkTo="/settings/schedule/classes/add" contentPosition="end">
                <div className="text-end w-full">
                    <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
                </div>
            </CustomFilterCard>
            <ActiveFilter filters={filters} onApplyFilters={onApplyFilters} isFilterVisible={isFilterVisible} onFilterClose={onFilterClose} />
            <CustomTable data={tableData ? tableData : []} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default EventClasses;
