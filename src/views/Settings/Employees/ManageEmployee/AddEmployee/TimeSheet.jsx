import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeTimeSheet } from '../../../../../redux/actions/EmployeeSettings/employeesAction';
import CustomTable from '../../../../../shared/Table/CustomTable';

const TimeSheet = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployeeTimeSheet());
    }, [dispatch]);

    const { employeeTimeSheet } = useSelector((state) => state?.employees);

    const columns = [
        { field: 'club', header: 'Club' },
        { field: 'notes', header: 'Department' },
        { field: 'notes', header: 'ClockIn' },
        { field: 'notes', header: 'ClockOut' },
        { field: 'notes', header: 'Duration' },
    ];

    console.log(employeeTimeSheet, 'employeeTimeSheet');
    return <>{<CustomTable data={employeeTimeSheet} columns={columns} />}</>;
};

export default TimeSheet;
