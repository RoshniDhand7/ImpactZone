import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSecurityRole, getSecurityRoles } from '../../../../redux/actions/EmployeeSettings/securityRolesAction';
import { useHistory } from 'react-router-dom';
import { confirmDelete } from '../../../../utils/commonFunctions';

const SecurityRoles = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { allSecurityRoles } = useSelector((state) => state?.securityRole);
    useEffect(() => {
        dispatch(getSecurityRoles());
    }, [dispatch]);

    const onEdit = (col) => {
        history.push(`/settings/employee/security-roles/edit/${col._id}`);
    };
    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteSecurityRole(col._id, () => {}));
            },
            'Do you want to delete this Security Role?',
            position,
        );
    };
    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'description', body: 'descriptionBodyTemplate', header: 'Description' },
    ];
    return (
        <>
            <CustomFilterCard buttonTitle="Add Security Roles" linkTo="/settings/employee/security-roles/add" />
            <CustomTable data={allSecurityRoles} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default SecurityRoles;
