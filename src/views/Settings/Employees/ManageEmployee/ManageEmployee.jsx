import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, getEmployees } from '../../../../redux/actions/EmployeeSettings/employeesAction';
import { confirmDelete } from '../../../../utils/commonFunctions';

const ManageEmployee = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(getEmployees());
    }, []);

    const { allEmployees } = useSelector((state) => state.employees);
    const columns = [
        {
            field: 'name',
            body: (r) => r.firstName + '' + r.lastName,
            header: 'Name',
        },
        { field: 'barCode', header: 'BarCode' },
        { field: 'address', header: 'Address' },
        { field: 'primaryPhone', header: 'Primary Phone' },
        { field: 'hireDate', header: 'Hire Date' },
        { field: 'terminationDate', header: 'Termination Date' },
    ];
    const onView = (col) => {
        history.push(`/settings/employee/manage-employee/view/${col._id}`);
    };
    const onEdit = (col) => {
        history.push(`/settings/employee/manage-employee/edit/${col._id}`);
    };
    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteEmployee(col._id, () => {}));
            },
            'Do you want to delete this Employee ?',
            position,
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Employee" linkTo="/settings/employee/manage-employee/add" />
            <CustomTable data={allEmployees} columns={columns} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};
export default ManageEmployee;
