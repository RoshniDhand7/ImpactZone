import React, { useEffect } from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteResource, getResources } from '../../../../redux/actions/MembersSettings/resources';

const Resources = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getResources());
    }, [dispatch]);

    const { allResources } = useSelector((state) => state.resources);

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
    return (
        <>
            <CustomFilterCard buttonTitle="Add Resource Type" linkTo="/settings/members/resources/add" />
            <CustomTable data={allResources} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default Resources;