import React from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';

const Departments = () => {
    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'barCode', header: 'BarCode' },
        { field: 'address', header: 'Address' },
        { field: 'primaryPhone', header: 'Primary Phone' },
        { field: 'hireDate', header: 'Hire Date' },
        { field: 'terminationDate', header: 'Termination Date' },
    ];
    const onEdit = () => {};
    const onDelete = () => {};
    return (
        <>
            <>
                <CustomFilterCard buttonTitle="Add Depatments" linkTo="/settings/employee/departments/add" />
                <CustomTable
                    data={[
                        {
                            name: 'John Smith',
                            barCode: 4587899,
                            address: 'F-201',
                            primaryPhone: 7894563214,
                            hireDate: '21-Jan-2024',
                            terminationDate: '20-Dec-2025',
                        },
                    ]}
                    columns={columns}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </>
        </>
    );
};

export default Departments;
