import React, { useEffect, useState } from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteScheduledEvent, getEvents } from '../../../../redux/actions/ScheduleSettings/eventsActions';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import FilterComponent from '../../../../components/FilterComponent';
import { CustomDropDown, CustomInput } from '../../../../shared/Input/AllInputs';
import { ActiveFilterDropdown, EventTypeOptions } from '../../../../utils/dropdownConstants';

const EventSetup = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    const { allEvents } = useSelector((state) => state.event);
    const modifiedEvents = allEvents?.map((item) => ({
        ...item,
        internalUse: item.internalUse ? true : false,
    }));

    const columns = [
        { field: 'internalUse', header: 'Internal Use' },
        { field: 'eventType', header: 'Type' },
        { field: 'name', header: 'Name' },
        { field: 'locationType', header: 'Location Type' },
        { field: 'color', header: 'Mapped to Services' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/schedule/events/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteScheduledEvent(col._id, () => {}));
            },
            'Do you want to delete this Event ?',
            position,
        );
    };
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(modifiedEvents);
    const [data, setData] = useState({
        filterType: 'AND',
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Events" linkTo="/settings/schedule/events/add" contentPosition="end">
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
                <CustomGridLayout>
                    <CustomDropDown col={12} label="Status" name="isActive" options={ActiveFilterDropdown} data={data} onChange={handleChange} showClear />
                    <CustomDropDown col={12} label="Type" name="eventType" options={EventTypeOptions} data={data} onChange={handleChange} showClear />
                    <CustomInput name="name" data={data} onChange={handleChange} col={12} />
                </CustomGridLayout>
            </FilterComponent>
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default EventSetup;
