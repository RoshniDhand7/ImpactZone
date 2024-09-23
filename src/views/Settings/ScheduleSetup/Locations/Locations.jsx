import React, { useEffect, useState } from 'react';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteLocation, getLocations } from '../../../../redux/actions/ScheduleSettings/locationsActions';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import FilterComponent from '../../../../components/FilterComponent';
import { CustomDropDown, CustomMultiselect } from '../../../../shared/Input/AllInputs';
import { ActiveFilterDropdown } from '../../../../utils/dropdownConstants';
import useGetClubs from '../../../../hooks/useGetClubs';
import useLocationType from '../../../../hooks/Schedule/useLocationType';

const Locations = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLocations());
    }, [dispatch]);

    const { allLocations } = useSelector((state) => state.locations);
    const { clubsDropdown } = useGetClubs();
    const { locationTypeDropdown } = useLocationType();

    const columns = [
        { field: 'name', header: ' Location Name' },
        { field: 'locationTypeName', header: 'Location Type' },
        { field: 'clubName', body: (r) => r?.clubName?.join(' , '), header: 'Club' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/schedule/locations/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteLocation(col._id, () => {}));
            },
            'Do you want to delete this Locations ?',
            position,
        );
    };
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allLocations);
    const [data, setData] = useState({
        filterType: 'AND',
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Locations" linkTo="/settings/schedule/locations/add" contentPosition="end">
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
                    <CustomMultiselect col={12} name="clubId" label="Clubs" options={clubsDropdown} data={data} onChange={handleChange} showClear />
                    <CustomDropDown
                        col={12}
                        label="Location Type"
                        name="locationTypeId"
                        options={locationTypeDropdown}
                        data={data}
                        onChange={handleChange}
                        showClear
                    />
                </CustomGridLayout>
            </FilterComponent>
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default Locations;
