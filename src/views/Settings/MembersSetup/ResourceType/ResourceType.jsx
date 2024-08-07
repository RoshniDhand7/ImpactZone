import React, { useEffect } from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteResourceType, getResourceTypes } from '../../../../redux/actions/MembersSettings/resourceType';

const ResourceType = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getResourceTypes());
    }, [dispatch]);

    const { allResourceType } = useSelector((state) => state.resourceType);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'description', header: 'Description' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/members/resource-type/edit/${col._id}`);
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
    return (
        <>
            <CustomFilterCard buttonTitle="Add Resource Type" linkTo="/settings/members/resource-type/add" />
            <CustomTable data={allResourceType} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default ResourceType;
