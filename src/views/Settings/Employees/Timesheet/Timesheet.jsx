import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { getallEmployeeTimeSheet } from '../../../../redux/actions/EmployeeSettings/employeesAction';
import { diffHoursAndMinutes } from '../../../../utils/commonFunctions';
import useFilters from '../../../../hooks/useFilters';
import useGetClubs from '../../../../hooks/useGetClubs';
import useDepartments from '../../../../hooks/Employees/useDepartments';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import FilterComponent from '../../../../components/FilterComponent';
import { CustomCalenderInput, CustomMultiselect } from '../../../../shared/Input/AllInputs';
import CustomTable from '../../../../shared/Table/CustomTable';
import useEmployees from '../../../../hooks/Employees/useEmployees';
import EditTimesheetModal from '../ManageEmployee/AddEmployee/EditTimesheetModal';

const TimeSheet = () => {
    const dispatch = useDispatch();
    var startOfWeek = moment().utc().startOf('week').toDate();
    var endOfWeek = moment().utc().endOf('week').toDate();
    const initialData = {
        filterType: 'AND',
        from: startOfWeek,
        to: endOfWeek,
        club: null,
        department: null,
        employee: null,
    };
    const [data, setData] = useState(initialData);
    const [visible, setVisible] = useState(false);
    const [timesheetEditId, setTimesheetEditId] = useState(null);

    useEffect(() => {
        getAllTimesheet();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const getAllTimesheet = () => {
        dispatch(getallEmployeeTimeSheet(_, data));
    };

    const { allTimesheet } = useSelector((state) => state?.employees);

    const columns = [
        { field: 'club', header: 'Club' },
        { field: 'employeeName', header: 'Employee Name' },
        { field: 'department', header: 'Department' },
        { field: 'clockIn', body: (r) => (r?.clockIn ? moment(r?.clockIn).format('MM/DD/YYYY hh:mm a') : null), header: 'ClockIn' },
        { field: 'clockOut', body: (r) => (r?.clockOut ? moment(r?.clockOut).format('MM/DD/YYYY hh:mm a') : null), header: 'ClockOut' },
        {
            field: 'duration',
            body: (r) => {
                if (r?.clockOut && r?.clockIn) {
                    const { hours, minutes } = diffHoursAndMinutes(r?.clockOut, r?.clockIn);
                    return `${hours} hours ${minutes} minutes`;
                }
                return '-';
            },
            header: 'Duration',
        },
        { field: 'modifiedOn', body: (r) => moment(r?.clockIn).format(' MM/DD/YYYY hh:mm a'), header: 'Modified On' },
    ];
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(
        allTimesheet,
        'backend',
        null,
        getallEmployeeTimeSheet,
    );

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const handleEditTimeSheet = (col) => {
        setTimesheetEditId(col?._id);
        setVisible(true);
    };

    const { clubsDropdown } = useGetClubs();
    const { departmentsDropdown } = useDepartments();
    const { employeesDropdown } = useEmployees();

    return (
        <>
            <CustomFilterCard contentPosition="end">
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
                initailData={initialData}
            >
                <CustomGridLayout>
                    <CustomMultiselect col={12} label="Club" name="club" options={clubsDropdown} data={data} onChange={handleChange} showClear />
                    <CustomMultiselect
                        col={12}
                        label="Department"
                        name="department"
                        options={departmentsDropdown}
                        data={data}
                        onChange={handleChange}
                        showClear
                    />
                    <CustomMultiselect col={12} name="employee" options={employeesDropdown} data={data} onChange={handleChange} showClear />
                    <CustomCalenderInput name="from" data={data} onChange={handleChange} col={12} maxDate={data.to} />
                    <CustomCalenderInput name="to" data={data} onChange={handleChange} col={12} minDate={data.from} />
                </CustomGridLayout>
            </FilterComponent>
            <CustomTable data={tableData} columns={columns} onEdit={handleEditTimeSheet} />
            <EditTimesheetModal
                timesheetEditId={timesheetEditId}
                visible={visible}
                setVisible={setVisible}
                setTimesheetEditId={setTimesheetEditId}
                getAllTimesheet={getAllTimesheet}
            />
        </>
    );
};

export default TimeSheet;
