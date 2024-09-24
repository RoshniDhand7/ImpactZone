import React from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteLocationType } from '../../../../redux/actions/ScheduleSettings/locationTypeActions';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import useLocationType from '../../../../hooks/Schedule/useLocationType';
import ActiveFilter from '../../../../components/Filters/ActiveFilter';

const LocationType = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { allLocationType } = useLocationType();

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'allowOverbooking', header: 'Allow Overbooking' },
        { field: 'isActive', header: 'Active' },
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
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allLocationType);

    return (
        <>
            <CustomFilterCard buttonTitle="Add Location Type" linkTo="/settings/schedule/location-type/add" contentPosition="end">
                <div className="text-end w-full">
                    <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
                </div>
            </CustomFilterCard>
            <ActiveFilter filters={filters} onApplyFilters={onApplyFilters} isFilterVisible={isFilterVisible} onFilterClose={onFilterClose} />
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default LocationType;
