import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlerts } from '../../../redux/actions/MembersPortal/memberPortalActions';
import ProfileDetail from './ProfileDetail';
import CustomTable from '../../../shared/Table/CustomTable';
import { useParams } from 'react-router-dom';
import { dateConversions } from '../../../utils/commonFunctions';
import { CustomFilterCard, CustomGridLayout } from '../../../shared/Cards/CustomCard';
import PrimaryButton from '../../../shared/Button/CustomButton';
import useFilters from '../../../hooks/useFilters';
import FilterComponent from '../../../components/FilterComponent';
import { CustomCalenderInput, CustomDropDown, CustomMultiselect } from '../../../shared/Input/AllInputs';
import { colorOptions } from '../../../utils/dropdownConstants';
import useEmployees from '../../../hooks/Employees/useEmployees';
import moment from 'moment';

const Alerts = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const alerts = useSelector((state) => state.membersPortal.alerts);
    const { employeesDropdown } = useEmployees();
    var startOfWeek = moment().utc().startOf('week').toDate();
    var endOfWeek = moment().utc().endOf('week').toDate();
    const initialData = {
        filterType: 'AND',
        from: startOfWeek,
        to: endOfWeek,
        employee: null,
        colorType: '',
    };
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        dispatch(getAlerts(setLoading, id, data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, id]);

    const columns = [
        { field: 'createdAt', body: (r) => dateConversions(r?.createdAt), header: 'Date' },
        {
            field: 'title',
            body: (r) => {
                return <p style={{ color: r?.colorType }}>{r?.title}</p>;
            },
            header: 'Title',
        },
        { field: 'employee', header: 'Employee' },
    ];
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(alerts, 'backend', id, getAlerts);
    return (
        <div className="">
            <ProfileDetail />
            <CustomFilterCard contentPosition="end">
                <div className="text-end w-full">
                    <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
                </div>
            </CustomFilterCard>
            <CustomTable data={tableData} columns={columns} loading={loading} />

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
                    <CustomDropDown col={12} label="Color" name="colorType" options={colorOptions} data={data} onChange={handleChange} showClear />
                    <CustomMultiselect col={12} name="employee" options={employeesDropdown} data={data} onChange={handleChange} showClear />
                    <CustomCalenderInput name="from" data={data} onChange={handleChange} col={12} maxDate={data.to} />
                    <CustomCalenderInput name="to" data={data} onChange={handleChange} col={12} minDate={data.from} />
                </CustomGridLayout>
            </FilterComponent>
        </div>
    );
};

export default Alerts;
