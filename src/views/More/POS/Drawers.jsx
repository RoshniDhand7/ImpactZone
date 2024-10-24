import React, { useEffect, useState } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../shared/Cards/CustomCard';
import PrimaryButton from '../../../shared/Button/CustomButton';
import CustomTable from '../../../shared/Table/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { getDrawers } from '../../../redux/actions/More/DrawersAction';
import { dateConversions } from '../../../utils/commonFunctions';
import FilterComponent from '../../../components/FilterComponent';
import { CustomCalenderInput, CustomDropDown, CustomMultiselect } from '../../../shared/Input/AllInputs';
import useFilters from '../../../hooks/useFilters';
import moment from 'moment';
import useGetClubs from '../../../hooks/useGetClubs';
import useEmployees from '../../../hooks/Employees/useEmployees';
import { ActiveFilterDropdown1 } from '../../../utils/dropdownConstants';
import _ from 'lodash';
import { getRegistersStatusAction } from '../../../redux/actions/POS/registerActions';
import { formatDateTime } from '../../../utils/dateTime';

const Drawers = () => {
    const dispatch = useDispatch();
    var startOfWeek = moment().utc().startOf('week').toDate();
    var endOfWeek = moment().utc().endOf('week').toDate();
    const initialData = {
        filterType: 'AND',
        from: startOfWeek,
        to: endOfWeek,
        clubs: null,
        employee: null,
        isActive: null,
    };
    const [data, setData] = useState(initialData);

    const columns = [
        { header: 'Register', field: 'name' },
        { header: 'Station', field: 'openedFrom' },
        { header: 'Opened At', body: (e) => formatDateTime(e?.openedAt) },
        { header: 'Opened By', field: 'openedBy' },
        { header: 'Status', field: 'status' },
        { header: 'Closed By', field: 'closedBy' },
        {
            header: 'Closed At',
            body: (e) => {
                if (e?.status === 'CLOSE') {
                    return formatDateTime(e?.closedAt);
                }
            },
        },
        { header: 'Starting Amount', field: 'cashAtStart' },
        {
            header: 'Ending Amount',
            body: (e) => {
                if (e?.status === 'CLOSE') {
                    return e?.cashAtEnd;
                }
            },
        },
    ];

    useEffect(() => {
        dispatch(getRegistersStatusAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const { allDrawers } = useSelector((state) => state?.drawers);

    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allDrawers, 'backend', null, getDrawers);
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const { clubsDropdown } = useGetClubs();
    const { employeesDropdown } = useEmployees();

    const { registerStatus } = useSelector((state) => state?.pos);
    console.log('registerStatus==>', registerStatus);

    return (
        <>
            <CustomFilterCard contentPosition="end">
                <PrimaryButton label="Filter" icon="pi pi-filter" className="mx-2 " onClick={onFilterOpen} />
            </CustomFilterCard>
            <CustomTable data={registerStatus} columns={columns} />
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
                    <CustomMultiselect col={12} label="Club" name="clubs" options={clubsDropdown} data={data} onChange={handleChange} showClear />
                    <CustomDropDown col={12} label="Status" name="isActive" options={ActiveFilterDropdown1} data={data} onChange={handleChange} showClear />
                    <CustomMultiselect col={12} name="employee" options={employeesDropdown} data={data} onChange={handleChange} showClear />
                    <CustomCalenderInput name="from" data={data} onChange={handleChange} col={12} />
                    <CustomCalenderInput name="to" data={data} onChange={handleChange} col={12} />
                </CustomGridLayout>
            </FilterComponent>
        </>
    );
};

export default Drawers;
