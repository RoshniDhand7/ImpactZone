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
        {
            field: 'openRegister',
            body: (r) => {
                if (r?.openRegister) {
                    const { formattedDate } = dateConversions(r.openRegister);
                    return formattedDate;
                }
                return null;
            },
            header: 'Open Date',
        },
        {
            field: 'employeeName',
            body: (r) => {
                if (r?.closeRegister) {
                    const { formattedDate } = dateConversions(r?.closeRegister);
                    return formattedDate;
                }
                return null;
            },
            header: 'Close Date',
        },
        { field: 'drawerStatus', header: 'Status' },
        { field: 'employee', header: 'Open Employee' },
        { field: 'openDrawerTotal', header: 'Starting Amount' },
        { field: 'closeDrawerTotal', header: 'Ending Amount' },
    ];

    useEffect(() => {
        dispatch(getDrawers(_, data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const { allDrawers } = useSelector((state) => state?.drawers);

    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allDrawers, 'backend', null, getDrawers);
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const { clubsDropdown } = useGetClubs();
    const { employeesDropdown } = useEmployees();
    return (
        <>
            <CustomFilterCard contentPosition="end">
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
