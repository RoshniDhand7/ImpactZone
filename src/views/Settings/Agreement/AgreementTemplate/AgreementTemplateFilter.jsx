import React, { useState } from 'react';
import FilterComponent from '../../../../components/FilterComponent';
import { CustomDropDown, CustomMultiselect } from '../../../../shared/Input/AllInputs';
import { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import { ActiveFilterDropdown } from '../../../../utils/dropdownConstants';
import useGetClubs from '../../../../hooks/useGetClubs';

const AgreementTemplateFilter = ({ filters, onApplyFilters, isFilterVisible, onFilterClose }) => {
    const [data, setData] = useState({
        filterType: 'AND',
        clubsId: [],
    });
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const { clubsDropdown } = useGetClubs();
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
                <CustomGridLayout>
                    <CustomDropDown
                        col={12}
                        label="Status"
                        name="isActive"
                        options={ActiveFilterDropdown}
                        optionLabel="name"
                        data={data}
                        onChange={handleChange}
                    />
                    <CustomMultiselect col={12} label="Club" name="clubsId" options={clubsDropdown} data={data} onChange={handleChange} showClear />
                </CustomGridLayout>
            </FilterComponent>
        </>
    );
};

export default AgreementTemplateFilter;
