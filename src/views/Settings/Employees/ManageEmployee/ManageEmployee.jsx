import React, { useEffect, useState } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, getEmployees } from '../../../../redux/actions/EmployeeSettings/employeesAction';
import { confirmDelete } from '../../../../utils/commonFunctions';
import CustomPaginator from '../../../../shared/Paginator/CustomPaginator';

const ManageEmployee = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [pageNo, setPageNo] = useState(0);

    useEffect(() => {
        dispatch(getEmployees(pageNo));
    }, [dispatch, pageNo]);

    const { allEmployees } = useSelector((state) => state.employees);

    const address = (r) => {
        return (
            <>
                {r?.street}
                {r?.state}
                {r?.city} {r?.zipCode ? `, ${r?.zipCode}` : ''}
            </>
        );
    };
    const columns = [
        {
            field: 'name',
            body: (r) => r.firstName + '' + r.lastName,
            header: 'Name',
        },
        { field: 'barCode', header: 'BarCode' },
        { field: 'address', body: address, header: 'Address' },
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
            <CustomTable data={allEmployees?.data} columns={columns} onView={onView} onEdit={onEdit} onDelete={onDelete} />
            {/* <CustomPaginator setPageNo={setPageNo} data={allEmployees} /> */}
        </>
    );
};
export default ManageEmployee;
