import React, { useState } from 'react';
import FilterComponent from '../../../../components/FilterComponent';
import { CustomCalenderInput, CustomDropDown, CustomInput, CustomMultiselect } from '../../../../shared/Input/AllInputs';
import useGetClubs from '../../../../hooks/useGetClubs';
import useCommissionGroup from '../../../../hooks/Inventory/useCommissionGroup';
import useLevel from '../../../../hooks/Schedule/useLevel';
import { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { ActiveFilterDropdown } from '../../../../utils/dropdownConstants';
import useDepartments from '../../../../hooks/Employees/useDepartments';

const EmployeeFilters = ({ onFilterClose, onApplyFilters, filters, isFilterVisible }) => {
    const [data, setData] = useState({
        filterType: 'AND',
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const { clubsDropdown } = useGetClubs();
    const { departmentsDropdown } = useDepartments();
    const { commissionGroupsDropdown } = useCommissionGroup();
    const { levelDropdown } = useLevel();
    return (
        <FilterComponent
            value={filters}
            onApply={onApplyFilters}
            visible={isFilterVisible}
            onHide={onFilterClose}
            data={data}
            handleChange={handleChange}
            setData={setData}
        >
            <CustomGridLayout>
                <CustomDropDown col={12} label="Status" name="isActive" options={ActiveFilterDropdown} data={data} onChange={handleChange} showClear />
                <CustomInput col={12} name="firstName" data={data} onChange={handleChange} />
                <CustomInput col={12} name="lastName" data={data} onChange={handleChange} />
                <CustomMultiselect col={12} name="clubs" options={clubsDropdown} data={data} onChange={handleChange} showClear />
                <CustomMultiselect
                    col="12"
                    name="employeeDepartmentData"
                    label="Departments"
                    data={data}
                    onChange={handleChange}
                    options={departmentsDropdown}
                    showClear
                />
                <CustomMultiselect
                    col="12"
                    name="employeeCommissionGroupData"
                    label="Commission Group"
                    data={data}
                    onChange={handleChange}
                    options={commissionGroupsDropdown}
                    showClear
                />
                <CustomMultiselect col="12" name="isClassLevel" label="Class Level" data={data} onChange={handleChange} options={levelDropdown} showClear />
                <CustomMultiselect
                    col="12"
                    name="isAppointmentLevel"
                    label="Appointment Level"
                    data={data}
                    onChange={handleChange}
                    options={levelDropdown}
                    showClear
                />
                <CustomCalenderInput name="hireDate" data={data} onChange={handleChange} col={12} showButtonBar />
            </CustomGridLayout>
        </FilterComponent>
    );
};

export default EmployeeFilters;
