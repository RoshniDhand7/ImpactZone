import React from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteDepartment } from '../../../../redux/actions/EmployeeSettings/departmentsAction';
import { confirmDelete } from '../../../../utils/commonFunctions';
import useFilters from '../../../../hooks/useFilters';
import useDepartments from '../../../../hooks/Employees/useDepartments';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import ActiveFilter from '../../../../components/Filters/ActiveFilter';

const Departments = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { allDepartments } = useDepartments();

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

    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allDepartments);

    return (
        <>
            <>
                <CustomFilterCard buttonTitle="Add Departments" linkTo="/settings/employee/departments/add" contentPosition="end">
                    <div className="text-end w-full">
                        <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
                    </div>
                </CustomFilterCard>
                <ActiveFilter filters={filters} onApplyFilters={onApplyFilters} isFilterVisible={isFilterVisible} onFilterClose={onFilterClose} />
                <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
            </>
        </>
    );
};

export default Departments;
