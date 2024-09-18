import React, { useState } from 'react';
import FilterComponent from '../../../../components/FilterComponent';
import { CustomDropDown, CustomMultiselect } from '../../../../shared/Input/AllInputs';
import { ActiveFilterDropdown, catalogProductTypeOptions, productTypeOptions, yesNoOptions } from '../../../../utils/dropdownConstants';
import useProfitCenters from '../../../../hooks/useProfitCenters';
import useGetClubs from '../../../../hooks/useGetClubs';
import useCategory from '../../../../hooks/useCategory';
import { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import useCommission from '../../../../hooks/useCommission';
import { Slider } from 'primereact/slider';
import useDiscount from '../../../../hooks/useDiscount';

const CatalogFilters = ({ onFilterClose, onApplyFilters, filters, isFilterVisible }) => {
    const [data, setData] = useState({
        filterType: 'AND',
    });
    const [value, setValue] = useState(null);
    const { profitCenterDropdown } = useProfitCenters();
    const { clubsDropdown } = useGetClubs();
    const { categoryDropdown } = useCategory();
    const { commissionGroupsDropdown } = useCommission();
    const { allDiscountDropdown } = useDiscount();

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    console.log(value, 'value');
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
                    <CustomDropDown col={12} name="type" options={catalogProductTypeOptions} data={data} onChange={handleChange} showClear />
                    <CustomMultiselect col={12} name="profitCentre" options={profitCenterDropdown} data={data} onChange={handleChange} />
                    <CustomDropDown col={12} label="Item Status" name="isActive" options={ActiveFilterDropdown} data={data} onChange={handleChange} showClear />
                    <CustomDropDown col={12} name="itemSoldOnline" label="Online Status" options={yesNoOptions} data={data} onChange={handleChange} showClear />
                    <CustomMultiselect col={12} name="clubs" options={clubsDropdown} data={data} onChange={handleChange} />
                    <CustomMultiselect col={12} name="category" options={categoryDropdown} onChange={handleChange} data={data} />
                    <CustomMultiselect col={12} name="commissionGroup" options={commissionGroupsDropdown} onChange={handleChange} data={data} />
                    <CustomMultiselect name="defaultDiscount" label="Discounts" options={allDiscountDropdown} onChange={handleChange} data={data} col={12} />
                    <Slider value={value} onChange={(e) => setValue(e.value)} className="w-14rem" />
                </CustomGridLayout>
            </FilterComponent>
        </>
    );
};

export default CatalogFilters;
