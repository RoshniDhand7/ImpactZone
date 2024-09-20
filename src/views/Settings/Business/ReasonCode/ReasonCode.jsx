import React, { useEffect, useState } from 'react';
import { CustomFilterCard, CustomGridLayout } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReasonCode, getReasonsDetails } from '../../../../redux/actions/BusinessSettings/reasonActions';
import useFilters from '../../../../hooks/useFilters';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import FilterComponent from '../../../../components/FilterComponent';
import { ActiveFilterDropdown, reasonCodeTypeOptions } from '../../../../utils/dropdownConstants';
import { CustomDropDown } from '../../../../shared/Input/AllInputs';

export default function ReasonCode() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getReasonsDetails());
    }, [dispatch]);

    const { allReasonCode } = useSelector((state) => state.reasonCode);
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allReasonCode);

    const columns = [
        { field: 'reasonCode', header: 'Name' },
        { field: 'reasonCodeType', header: 'Type' },
    ];

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteReasonCode(col._id, () => {}));
            },
            'Do you want to delete this Reason Code?',
            position,
        );
    };
    const onEdit = (col) => {
        history.push(`/settings/business/reason-code/edit/${col._id}`);
    };
    const [data, setData] = useState({
        filterType: 'AND',
    });

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Reason Code" linkTo="/settings/business/reason-code/add" contentPosition="end">
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
                    <CustomDropDown
                        col={12}
                        name="reasonCodeType"
                        label="Type"
                        options={reasonCodeTypeOptions}
                        data={data}
                        onChange={handleChange}
                        required
                        showClear
                    />
                </CustomGridLayout>
            </FilterComponent>
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}
