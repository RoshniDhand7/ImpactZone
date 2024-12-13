import React, { useEffect, useMemo, useState } from 'react';
import useMembers from '../../../../hooks/Members/useMembers';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations } from '../../../../redux/actions/Settings/ScheduleSetup/locationsActions';
import useFilters from '../../../../hooks/useFilters';
import { getResourceTypes } from '../../../../redux/actions/Settings/MembershipSetup/resourceTypeAction';
import { getResourcesList, resourceReserve, resourceReturn } from '../../../../redux/actions/CheckIn/CheckIn';
import formValidation from '../../../../utils/validations';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import CustomCard, { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { CustomAsyncReactSelect, CustomCalenderInput, CustomDropDown } from '../../../../shared/Input/AllInputs';
import CustomTable from '../../../../shared/Table/CustomTable';
import FilterComponent from '../../../../components/FilterComponent';
import FormPage from '../../../../shared/Layout/FormPage';

const Reserve = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        reserveMember: '',
        reserveDate: new Date(),
    });
    const { members } = useMembers();

    useEffect(() => {
        setData((prev) => ({ ...prev, reserveMember: members[0]?._id }));
    }, [members]);

    const suggestions = useMemo(
        () =>
            members.map((item) => ({
                value: item._id,
                name: `${item.firstName} ${item.MI} ${item.lastName}`,
            })),
        [members],
    );
    const memberOptions = useMemo(() => members?.map((item) => ({ name: `${item.firstName} ${item.MI} ${item.lastName}`, value: item?._id })), [members]);

    const [filteredData, setFilteredData] = useState({
        filterType: 'AND',
        location: '',
        resourceType: '',
    });

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
    const { locationDropdown } = useSelector((state) => state.settings.schedule);
    const { resourceTypeDropdown } = useSelector((state) => state.settings.members);

    const pastDueTemplate = (r) => {
        const now = new Date();
        const createdAt = new Date(r?.createdAt);
        const diffInMs = now - createdAt;

        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

        return (
            <div
                className={`${diffInHours > r.pastDue ? 'h-1rem w-2 border-circle bg-red-500 inline-block' : 'h-1rem w-2 border-circle bg-green-500 inline-block'}`}
            ></div>
        );
    };

    const handleReserveReturn = (r) => {
        if (r?.isBookedForMember) {
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
            body: (r) => `${r?.reserveCount}/${r?.availableQuantity}`,
            header: 'Resources Available',
        },
        { field: '', body: pastDueTemplate, header: 'Past Due' },
        { field: 'serviceCount', header: 'Services Available' },
    ];
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };

    const filterhandleChange = ({ name, value }) => {
        setFilteredData((prev) => ({ ...prev, [name]: value }));
    };
    const customActionTemplate = (r) => {
        return (
            <PrimaryButton
                name="status"
                label={r?.isBookedForMember ? 'Return' : 'Reserve'}
                onClick={() => handleReserveReturn(r)}
                disabled={!r?.isBookedForMember && r?.reserveCount === r?.availableQuantity}
            />
        );
    };
    return (
        <>
            <FormPage backText="Members">
                <CustomCard title="Reserve" col="12">
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

                        <CustomCalenderInput label="Date" name="reserveDate" data={data} onChange={handleChange} col={6} extraClassName={'mb-2'} />
                    </CustomGridLayout>
                    <CustomTable convertToboolean={false} data={tableData} columns={reserveColumn} customActionTemplate={customActionTemplate} />
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
                </CustomCard>
            </FormPage>
        </>
    );
};

export default Reserve;
