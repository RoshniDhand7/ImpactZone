import React, { useState } from 'react';
import FilterComponent from '../../../../components/FilterComponent';
import { CustomDropDown, CustomMultiselect } from '../../../../shared/Input/AllInputs';
import { ActiveFilterDropdown } from '../../../../utils/dropdownConstants';
import useGetClubs from '../../../../hooks/useGetClubs';

const TaxFilter = ({ onFilterClose, onApplyFilters, filters, isFilterVisible }) => {
    const [data, setData] = useState({
        filterType: 'AND',
    });
    const { clubsDropdown } = useGetClubs();
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    console.log(isFilterVisible, 'isFilterVisible');

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
                <div>
                    <CustomDropDown col={12} name="isActive" options={ActiveFilterDropdown} data={data} onChange={handleChange} showClear />
                    <CustomMultiselect col={12} name="club" options={clubsDropdown} data={data} onChange={handleChange} />
                </div>
            </FilterComponent>
        </>
    );
};

export default TaxFilter;
