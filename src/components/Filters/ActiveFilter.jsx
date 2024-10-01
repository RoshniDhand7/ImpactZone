import React, { useState } from 'react';
import FilterComponent from '../FilterComponent';
import { CustomDropDown } from '../../shared/Input/AllInputs';
import { ActiveFilterDropdown } from '../../utils/dropdownConstants';

const ActiveFilter = ({ filters, onApplyFilters, isFilterVisible, onFilterClose }) => {
    const [data, setData] = useState({
        filterType: 'AND',
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <FilterComponent
                value={filters}
                onApply={onApplyFilters}
                visible={isFilterVisible}
                onHide={onFilterClose}
                data={data}
                handleChange={handleChange}
                setData={setData}
            >
                <CustomDropDown col={12} label="Status" name="isActive" options={ActiveFilterDropdown} data={data} onChange={handleChange} showClear />
            </FilterComponent>
        </>
    );
};

export default ActiveFilter;
