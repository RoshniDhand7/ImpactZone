import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { getSecurityRoles } from '../../../../redux/actions/EmployeeSettings/securityRolesAction';
import { useHistory } from 'react-router-dom';

const SecurityRoles = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { allSecurityRoles } = useSelector((state) => state?.securityRole);
    useEffect(() => {
        dispatch(getSecurityRoles());
    }, []);

    const onEdit = (col) => {
        history.push(`/settings/employee/security-roles/edit/${col._id}`);
    };
    const onDelete = () => {};
    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'description', header: 'Description' },
    ];
    return (
        <>
            <CustomFilterCard buttonTitle="Add Security Roles" linkTo="/settings/employee/security-roles/add" />
            <CustomTable data={allSecurityRoles} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default SecurityRoles;
