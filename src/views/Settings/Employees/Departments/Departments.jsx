import React, { useState } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteDepartment } from '../../../../redux/actions/EmployeeSettings/departmentsAction';
import { confirmDelete } from '../../../../utils/commonFunctions';
import useFilters from '../../../../hooks/useFilters';
import useDepartments from '../../../../hooks/Employees/useDepartments';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import FilterComponent from '../../../../components/FilterComponent';
import { CustomDropDown } from '../../../../shared/Input/AllInputs';
import { ActiveFilterDropdown } from '../../../../utils/dropdownConstants';

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
    const [data, setData] = useState({
        filterType: 'AND',
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <>
                <CustomFilterCard buttonTitle="Add Departments" linkTo="/settings/employee/departments/add" contentPosition="end">
                    <div className="text-end w-full">
                        <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
                    </div>
                </CustomFilterCard>
                <FilterComponent
                    value={filters}
                    onApply={onApplyFilters}
                    visible={isFilterVisible}
                    onHide={onFilterClose}
                    data={data}
                    handleChange={handleChange}
                    setData={setData}
                >
                    <CustomDropDown col={12} label="Status" name="isActive" options={ActiveFilterDropdown} data={data} onChange={handleChange} showClear />
                </FilterComponent>
                <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
            </>
        </>
    );
};

export default Departments;
