import React from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';

const Availability = () => {
    const tableData = [];
    const columns = [
        {
            field: 'name',
            body: (r) => r.firstName + ' ' + r.lastName,
            header: 'Name',
        },
        { field: 'barCode', header: 'Club' },
        { field: 'primaryPhone', header: 'Date' },
        { field: 'terminationDate', header: 'Duration' },
    ];
    return (
        <>
            <CustomFilterCard buttonTitle="Add Availability" linkTo="/settings/employee/availability/add"></CustomFilterCard>
            <CustomTable data={tableData} columns={columns} />
        </>
    );
};

export default Availability;
