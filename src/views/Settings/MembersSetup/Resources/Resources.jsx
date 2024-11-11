import React from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteResource } from '../../../../redux/actions/MembersSettings/resources';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import ActiveFilter from '../../../../components/Filters/ActiveFilter';
import useResources from '../../../../hooks/Members/useResources';

const Resources = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { allResources } = useResources();

    const columns = [
        { field: 'name', header: 'Resource Name' },
        { field: 'resourceType', header: 'Resource Type' },
        { field: 'location', header: 'Location' },
        { field: 'availableQuantity', header: 'Available' },
        { field: 'pastDue', header: 'Past Due' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/members/resources/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteResource(col._id, () => {}));
            },
            'Do you want to delete this Resources ?',
            position,
        );
    };
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allResources);

    return (
        <>
            <CustomFilterCard buttonTitle="Add Resource" linkTo="/settings/members/resources/add" contentPosition="end">
                <PrimaryButton label="Filters" icon="pi pi-filters" onClick={onFilterOpen} className="mx-2" />
            </CustomFilterCard>
            <ActiveFilter filters={filters} onApplyFilters={onApplyFilters} isFilterVisible={isFilterVisible} onFilterClose={onFilterClose} />
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default Resources;
