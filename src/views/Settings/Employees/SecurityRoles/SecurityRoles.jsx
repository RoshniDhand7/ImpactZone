import React from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';

const SecurityRoles = () => {
    const onEdit = () => {};
    const onDelete = () => {};
    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'description', header: 'Description' },
    ];
    return (
        <>
            <CustomFilterCard buttonTitle="Add Security Roles" linkTo="/settings/employee/security-roles/add" />
            <CustomTable
                data={[
                    {
                        name: 'John Smith',
                        description: 4587899,
                    },
                ]}
                columns={columns}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </>
    );
};

export default SecurityRoles;
