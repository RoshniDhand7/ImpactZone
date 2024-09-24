import React, { useState } from 'react';
import FilterComponent from '../../../../components/FilterComponent';
import { CustomDropDown, CustomInput } from '../../../../shared/Input/AllInputs';
import { ActiveFilterDropdown } from '../../../../utils/dropdownConstants';
import { CustomGridLayout } from '../../../../shared/Cards/CustomCard';

const MemberTypeFilter = ({ filters, onApplyFilters, isFilterVisible, onFilterClose }) => {
    const [data, setData] = useState({
        filterType: 'AND',
    });
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
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
                <CustomInput name="name" data={data} onChange={handleChange} col={12} />
            </CustomGridLayout>
        </FilterComponent>
    );
};

export default MemberTypeFilter;
