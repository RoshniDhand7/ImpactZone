import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../../../../shared/Table/CustomTable';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import { diffHoursAndMinutes, getDateandTime } from '../../../../../utils/commonFunctions';
import FilterComponent from '../../../../../components/FilterComponent';
import useFilters from '../../../../../hooks/useFilters';
import { CustomFilterCard, CustomGridLayout } from '../../../../../shared/Cards/CustomCard';
import { CustomCalenderInput, CustomMultiselect } from '../../../../../shared/Input/AllInputs';
import useGetClubs from '../../../../../hooks/useGetClubs';
import PrimaryButton from '../../../../../shared/Button/CustomButton';
import useDepartments from '../../../../../hooks/Employees/useDepartments';
import EditTimesheetModal from './EditTimesheetModal';
import { getEmployeeTimeSheet } from '../../../../../redux/actions/Settings/Employee/employeesAction';

const TimeSheet = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    let startOfWeek = moment().utc().startOf('week').toDate();
    let endOfWeek = moment().utc().endOf('week').toDate();
    const initialData = {
        filterType: 'AND',
        from: startOfWeek,
        to: endOfWeek,
        club: null,
        department: null,
    };
    const [data, setData] = useState(initialData);
    const [visible, setVisible] = useState(false);
    const [timesheetEditId, setTimesheetEditId] = useState(null);

    useEffect(() => {
        getAllTimesheet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, id]);

    const getAllTimesheet = () => {
        dispatch(getEmployeeTimeSheet(_, id, data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    const { employeeTimeSheet } = useSelector((state) => state?.employees);

    const columns = [
        { field: 'club', header: 'Club' },
        { field: 'department', header: 'Department' },
        { field: 'clockIn', body: (r) => getDateandTime(r?.clockIn), header: 'ClockIn' },
        { field: 'clockOut', body: (r) => getDateandTime(r?.clockOut), header: 'ClockOut' },
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
        { field: 'modifiedOn', body: (r) => getDateandTime(r?.clockIn), header: 'Modified On' },
    ];
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(
        employeeTimeSheet,
        'backend',
        id,
        getEmployeeTimeSheet,
    );

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const { clubsDropdown } = useGetClubs();
    const { departmentsDropdown } = useDepartments();

    const handleEditTimeSheet = (col) => {
        setTimesheetEditId(col?._id);
        setVisible(true);
    };

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
