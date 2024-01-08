import React from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';

const JobTitle = () => {
    const data = [
        {
            name: 'Gym Floor',
            description: 'Lorem Ipsum',
        },
    ];
    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'description', header: 'Description' },
    ];

    const onDelete = () => {};
    const onEdit = () => {};

    return (
        <>
            <CustomFilterCard buttonTitle="Add Job Title" linkTo="/settings/business/job-title/add" />
            <CustomTable data={data} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default JobTitle;
