import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAvailability } from '../../../../redux/actions/EmployeeSettings/availabilityAction';
import { useHistory } from 'react-router-dom';

const Availability = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllAvailability());
    }, [dispatch]);

    const { allAvailability } = useSelector((state) => state?.employeeAvailability);

    const columns = [
        { field: 'employee', header: 'Employee' },
        { field: 'club', body: (r) => (r?.club?.length > 0 ? r?.club?.map((item) => item.name).join(',') : '-'), header: 'Club' },
        { field: 'createdAt', header: 'Date' },
    ];

    const handleEdit = (col) => {
        history.push(`/settings/employee/availability/edit/${col._id}`);
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Availability" linkTo="/settings/employee/availability/add"></CustomFilterCard>
            <CustomTable data={allAvailability} columns={columns} onEdit={handleEdit} />
        </>
    );
};

export default Availability;
