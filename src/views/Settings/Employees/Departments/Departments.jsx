import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteDepartment, getDepartments } from '../../../../redux/actions/EmployeeSettings/departmentsAction';
import { confirmDelete } from '../../../../utils/commonFunctions';

const Departments = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { allDepartments } = useSelector((state) => state?.department);
    useEffect(() => {
        dispatch(getDepartments());
    }, [dispatch]);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'showInCalender', header: 'Show in Calendar' },
        { field: 'visibleOnline', header: 'Visible Online' },
        { field: 'salesPersonOnline', header: 'Sales Person Online' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/employee/departments/edit/${col._id}`);
    };
    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteDepartment(col._id, () => {}));
            },
            'Do you want to delete this Department ?',
            position,
        );
    };
    return (
        <>
            <>
                <CustomFilterCard buttonTitle="Add Departments" linkTo="/settings/employee/departments/add" />
                <CustomTable data={allDepartments} columns={columns} onEdit={onEdit} onDelete={onDelete} />
            </>
        </>
    );
};

export default Departments;
