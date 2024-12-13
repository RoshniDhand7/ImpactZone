import React, { useEffect } from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { confirmDelete } from '../../../../utils/commonFunctions';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import ActiveFilter from '../../../../components/Filters/ActiveFilter';
import { deleteResourceType, getResourceTypes } from '../../../../redux/actions/Settings/MembershipSetup/resourceTypeAction';

const ResourceType = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getResourceTypes());
    }, [dispatch]);

    const { resourceType } = useSelector((state) => state.settings.members);
    const { isTableLoading } = useSelector((state) => state?.tableLoader);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'description', body: 'descriptionBodyTemplate', header: 'Description' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/member-setup/resource-type/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteResourceType(col._id, () => {}));
            },
            'Do you want to delete this Resource Type ?',
            position,
        );
    };
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(resourceType);

    return (
        <>
            <CustomFilterCard buttonTitle="Add Resource Type" linkTo="/settings/member-setup/resource-type/add" contentPosition="end">
                <PrimaryButton label="Filters" icon="pi pi-filters" onClick={onFilterOpen} className="mx-2" />
            </CustomFilterCard>
            <ActiveFilter filters={filters} onApplyFilters={onApplyFilters} isFilterVisible={isFilterVisible} onFilterClose={onFilterClose} />
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} loading={isTableLoading} />
        </>
    );
};

export default ResourceType;
