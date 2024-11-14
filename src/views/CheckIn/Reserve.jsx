import React, { useEffect, useState } from 'react';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import { CustomFilterCard, CustomGridLayout } from '../../shared/Cards/CustomCard';
import PrimaryButton from '../../shared/Button/CustomButton';
import { CustomAsyncReactSelect, CustomCalenderInput, CustomDropDown } from '../../shared/Input/AllInputs';
import CustomTable from '../../shared/Table/CustomTable';
import FilterComponent from '../../components/FilterComponent';
import useFilters from '../../hooks/useFilters';
import formValidation from '../../utils/validations';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations } from '../../redux/actions/ScheduleSettings/locationsActions';
import { getResourceTypes } from '../../redux/actions/MembersSettings/resourceType';
import { getResourcesList, resourceReserve, resourceReturn } from '../../redux/actions/CheckIn/CheckIn';

const Reserve = ({ reserve, setReserve, suggestions, memberOptions, member }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        reserveMember: '',
        reserveDate: new Date(),
    });

    const [filteredData, setFilteredData] = useState({
        filterType: 'AND',
        location: '',
        resourceType: '',
    });

    useEffect(() => {
        setData((prev) => ({ ...prev, reserveMember: member }));
    }, [member]);

    useEffect(() => {
        dispatch(getResourceTypes());
        dispatch(getLocations());
    }, [dispatch]);
    useEffect(() => {
        if (data?.reserveMember && data?.reserveDate) {
            dispatch(getResourcesList(data));
        }
        //eslint-disable-next-line
    }, [data?.reserveMember, data?.reserveDate]);
    const { resourceList } = useSelector((state) => state.checkin);

    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(resourceList);
    const { locationDropdown } = useSelector((state) => state.locations);
    const { resourceTypeDropdown } = useSelector((state) => state.resourceType);

    const pastDueTemplate = (r) => {
        console.log(r);
        const now = new Date();
        const createdAt = new Date(r?.createdAt);
        const diffInMs = now - createdAt;

        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

        console.log('diffInHours', diffInHours > r.pastDue);
        return (
            <div
                className={`${diffInHours > r.pastDue ? 'h-1rem w-4 border-circle bg-red-500 inline-block' : 'h-1rem w-4 border-circle bg-green-500 inline-block'}`}
            ></div>
        );
    };

    const handleReserveReturn = (r) => {
        console.log(r?.status, 'status');
        if (r?.status === 'RESERVED') {
            dispatch(resourceReturn(data, r?.reserveId, () => dispatch(getResourcesList(data))));
        } else {
            dispatch(resourceReserve(r?._id, data, () => dispatch(getResourcesList(data))));
        }
    };

    const reserveColumn = [
        { field: 'name', header: 'Resource' },
        { field: 'resourceType', header: 'Resource Type' },
        { field: 'location', header: 'Location' },
        {
            field: '',
            body: (r) => `${r?.remainingQuantity === 0 ? r?.availableQuantity : r?.remainingQuantity}/${r?.availableQuantity}`,
            header: 'Resources Available',
        },
        { field: '', body: pastDueTemplate, header: 'Past Due' },
        { field: '', body: (r) => (r?.services?.length > 0 ? r?.services?.map((item) => item.name).join(' , ') : 'Free'), header: 'Services Available' },
    ];
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const filterhandleChange = ({ name, value }) => {
        setFilteredData((prev) => ({ ...prev, [name]: value }));
    };
    console.log('data>>', data);
    const customActionTemplate = (r) => {
        return <PrimaryButton name="status" label={r?.status === 'RESERVED' ? 'Return' : 'Reserve'} onClick={() => handleReserveReturn(r)} />;
    };

    return (
        <>
            <CustomDialog
                title={'Reserve'}
                visible={reserve}
                onCancel={() => {
                    setReserve(false);
                }}
                loading={false}
                width="auto"
            >
                <CustomFilterCard contentPosition="end m-0">
                    <PrimaryButton label="Filters" icon="pi pi-filters" onClick={onFilterOpen} className="mx-2" />
                </CustomFilterCard>
                <CustomGridLayout>
                    <div className="col-6 ">
                        <label className=" ml-1 mb-3">Member</label>
                        <CustomAsyncReactSelect
                            name="reserveMember"
                            suggestions={suggestions}
                            options={memberOptions}
                            placeholder="Search Member"
                            showLabel={false}
                            value={data.reserveMember}
                            onChange={handleChange}
                            col={12}
                        />
                    </div>

                    <CustomCalenderInput label="Date" name="reserveDate" data={data} onChange={handleChange} col={6} />
                </CustomGridLayout>
                {<CustomTable convertToboolean={false} data={tableData} columns={reserveColumn} customActionTemplate={customActionTemplate} />}
                <FilterComponent
                    value={filters}
                    onApply={onApplyFilters}
                    visible={isFilterVisible}
                    onHide={onFilterClose}
                    data={filteredData}
                    handleChange={filterhandleChange}
                    setData={setFilteredData}
                >
                    <CustomGridLayout>
                        <CustomDropDown
                            name="resourceType"
                            options={resourceTypeDropdown?.map((item) => ({ name: item.name, value: item.name }))}
                            data={filteredData}
                            onChange={filterhandleChange}
                            col={12}
                        />
                        <CustomDropDown
                            name="location"
                            options={locationDropdown?.map((item) => ({ name: item.name, value: item.name }))}
                            data={filteredData}
                            onChange={filterhandleChange}
                            col={12}
                        />
                    </CustomGridLayout>
                </FilterComponent>
            </CustomDialog>
        </>
    );
};

export default Reserve;
