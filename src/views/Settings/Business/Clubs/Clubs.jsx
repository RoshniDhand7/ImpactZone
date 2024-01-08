import React from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';

const Clubs = () => {
    const history = useHistory();
    const data = [
        {
            name: 'ABC Employee',
            phone: '+1369874563',
            email: 'gym@yopmail.com',
            address: 'New Jersey,United States',
        },
    ];
    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'phone', header: 'Phone Number' },
        { field: 'email', header: 'Email' },
        { field: 'address', header: 'Address' },
    ];

    const onDelete = () => {};
    const onEdit = () => {
        history.push('/settings/business/clubs/edit');
    };
    return (
        <>
            <CustomTable data={data} columns={columns} onEdit={onEdit} />
        </>
    );
};

export default Clubs;
