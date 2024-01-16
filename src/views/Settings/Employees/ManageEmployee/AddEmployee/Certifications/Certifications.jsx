import React from 'react';
import { CustomFilterCard } from '../../../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../../../shared/Table/CustomTable';

const Certifications = () => {
    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'certificateNumber', header: 'Cerificate Number' },
        { field: 'description', header: 'Description' },
        { field: 'issuer', header: 'Issuer' },
        { field: 'acquiredDate', header: 'Acquired Date' },
        { field: 'expirationDate', header: 'Expiration Date' },
    ];
    return (
        <>
            <CustomFilterCard buttonTitle="Add Certifications" linkTo="/settings/employee/manage-employee/add/certifications" />
            <CustomTable
                data={[
                    {
                        name: 'John Smith',
                        certificateNumber: 4587899,
                        description: 'Good',
                        issuer: 'Lorem Ipsum',
                        acquiredDate: '21-July-2024',
                        expirationDate: '20-Dec-2025',
                    },
                ]}
                columns={columns}
            />
        </>
    );
};

export default Certifications;
