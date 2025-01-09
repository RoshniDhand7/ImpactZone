import React, { useState } from 'react';
import FilterComponent from '../../../../components/FilterComponent';
import { CustomCalenderInput, CustomDropDown, CustomMultiselect } from '../../../../shared/Input/AllInputs';
import { ActiveFilterDropdown, catalogProductTypeOptions, yesNoOptions } from '../../../../utils/dropdownConstants';
import useGetClubs from '../../../../hooks/useGetClubs';
import useCategory from '../../../../hooks/Inventory/useCategory';
import { CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import useCommission from '../../../../hooks/Inventory/useCommissionGroup';
import useDiscount from '../../../../hooks/useDiscount';
import CustomSlider from '../../../../shared/Input/CustomSlider';
import useEmployees from '../../../../hooks/Employees/useEmployees';
import { Tooltip } from 'primereact/tooltip';
import useProfitCenters from '../../../../hooks/Inventory/useProfitCenters';

const CatalogFilters = ({ onFilterClose, onApplyFilters, filters, isFilterVisible, catalogProductDropdown }) => {
    const [data, setData] = useState({
        filterType: 'AND',
    });
    const { profitCenterDropdown } = useProfitCenters();
    const { clubsDropdown } = useGetClubs();
    const { categoryDropdown } = useCategory();
    const { commissionGroupsDropdown } = useCommission();
    const { allDiscountDropdown } = useDiscount();
    const { employeesDropdown } = useEmployees();

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
                <CustomGridLayout>
                    <CustomDropDown col={12} name="type" options={catalogProductTypeOptions} data={data} onChange={handleChange} showClear />
                    <CustomMultiselect col={12} name="profitCenter" options={profitCenterDropdown} data={data} onChange={handleChange} />
                    <CustomDropDown col={12} label="Item Status" name="isActive" options={ActiveFilterDropdown} data={data} onChange={handleChange} showClear />
                    <CustomDropDown col={12} name="itemSoldOnline" label="Online Status" options={yesNoOptions} data={data} onChange={handleChange} showClear />
                    <CustomMultiselect col={12} name="clubs" options={clubsDropdown} data={data} onChange={handleChange} />
                    <CustomMultiselect col={12} name="category" options={categoryDropdown} onChange={handleChange} data={data} />
                    <CustomMultiselect col={12} name="commissionGroup" options={commissionGroupsDropdown} onChange={handleChange} data={data} />
                    <CustomMultiselect name="defaultDiscount" label="Discounts" options={allDiscountDropdown} onChange={handleChange} data={data} col={12} />
                    <CustomMultiselect name="paysFor" label="Pay for events" options={catalogProductDropdown} onChange={handleChange} data={data} col={12} />
                    <CustomDropDown col={12} name="employee" label="Created By" options={employeesDropdown} data={data} onChange={handleChange} showClear />
                    <CustomCalenderInput name="createdAt" label="Created Date" data={data} onChange={handleChange} required col={12} showButtonBar />
                    <CustomSlider
                        name="unitPrice"
                        label="Price Range"
                        data={data}
                        onChange={handleChange}
                        required
                        col={12}
                        min={1}
                        max={1000}
                        pt={{
                            root: { className: 'w-14rem sliderTooltip' },
                            handle: { className: 'bg-primary-dark border-900 ' },
                            range: { className: 'bg-primary-dark ' },
                        }}
                    />
                    <Tooltip target=".sliderTooltip" content={data?.unitPrice} position="top" />
                </CustomGridLayout>
            </FilterComponent>
        </>
    );
};

export default CatalogFilters;
