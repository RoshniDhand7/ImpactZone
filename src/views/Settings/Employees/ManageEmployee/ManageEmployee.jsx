import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, getEmployees } from '../../../../redux/actions/Settings/Employee/employeesAction';
import { confirmDelete } from '../../../../utils/commonFunctions';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import EmployeeFilters from './EmployeeFilters';
import moment from 'moment';

const ManageEmployee = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);

    const { employees } = useSelector((state) => state.settings.employee);

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
            body: (r) => r.firstName + ' ' + r.lastName,
            header: 'Name',
        },
        { field: 'barCode', header: 'BarCode' },
        { field: 'address', body: address, header: 'Address' },
        { field: 'primaryPhone', header: 'Primary Phone' },
        { field: 'hireDate', body: (r) => (r?.hireDate ? moment(r?.hireDate).format('DD-MM-YYYY') : ''), header: 'Hire Date' },
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

    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(employees);

    return (
        <>
            <CustomFilterCard buttonTitle="Add Employee" linkTo="/settings/employee/manage-employee/add" contentPosition="end">
                <div className="text-end w-full">
                    <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
                </div>
            </CustomFilterCard>
            <EmployeeFilters onFilterClose={onFilterClose} onApplyFilters={onApplyFilters} filters={filters} isFilterVisible={isFilterVisible} />
            <CustomTable data={tableData} columns={columns} onView={onView} onEdit={onEdit} onDelete={onDelete} />
            {/* <CustomPaginator setPageNo={setPageNo} data={employees} /> */}
        </>
    );
};
export default ManageEmployee;
