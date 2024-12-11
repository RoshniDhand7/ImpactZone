import React, { useEffect, useState } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../shared/Cards/CustomCard';
import PrimaryButton from '../../../shared/Button/CustomButton';
import CustomTable from '../../../shared/Table/CustomTable';
import { getAllCheckIn } from '../../../redux/actions/More/AttendanceAction';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import FilterComponent from '../../../components/FilterComponent';
import useFilters from '../../../hooks/useFilters';
import { CustomCalenderInput, CustomInput } from '../../../shared/Input/AllInputs';
import { dateConversions } from '../../../utils/commonFunctions';

const CheckInHistory = () => {
    const dispatch = useDispatch();
    let startOfWeek = moment().utc().startOf('week').toDate();
    let endOfWeek = moment().utc().endOf('week').toDate();
    const initialData = {
        filterType: 'AND',
        from: startOfWeek,
        to: endOfWeek,
        name: '',
    };
    const [data, setData] = useState(initialData);
    useEffect(() => {
        dispatch(getAllCheckIn(_, data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const { allAttendanceCheckIn } = useSelector((state) => state?.moreAttendance);

    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(
        allAttendanceCheckIn,
        'backend',
        null,
        getAllCheckIn,
    );

    const columns = [
        { field: 'employee', header: 'Employee Name' },
        { field: 'department', body: (r) => r?.department?.map((item) => item.name)?.join(','), header: 'Department' },
        { field: 'createdAt', body: (r) => dateConversions(r?.createdAt), header: 'Check in Date/Time' },
    ];
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <CustomFilterCard title="Check In History" titleClassName="font-bold text-xl">
                <PrimaryButton label="Filter" icon="pi pi-filter" className="mx-2 " onClick={onFilterOpen} />
            </CustomFilterCard>
            <CustomTable data={tableData} columns={columns} />
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
                    <CustomInput name="name" data={data} onChange={handleChange} col={12} />
                    <CustomCalenderInput name="from" data={data} onChange={handleChange} col={12} showTime hourFormat="12" />
                    <CustomCalenderInput name="to" data={data} onChange={handleChange} col={12} showTime hourFormat="12" />
                </CustomGridLayout>
            </FilterComponent>
        </>
    );
};

export default CheckInHistory;
