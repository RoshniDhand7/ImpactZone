import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteTax, getTaxes } from '../../../../redux/actions/PosSettings/tax';
import FilterComponent from '../../../../components/FilterComponent';
import useFilters from '../../../../hooks/useFilters';
import PrimaryButton from '../../../../shared/Button/CustomButton';

const Tax = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTaxes());
    }, [dispatch]);

    const { allTaxes } = useSelector((state) => state.taxes);
    const { events, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allTaxes);

    const columns = [
        { field: 'taxRateName', header: 'Tax Rate Name' },
        { field: 'taxRatePercentage', body: (r) => r.taxRatePercentage + '%', header: 'Tax Rate Percentage' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/pos/tax/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(
                    deleteTax(col._id, () => {
                        dispatch(getTaxes());
                    }),
                );
            },
            'Do you want to delete this Tax ?',
            position,
        );
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Tax" linkTo="/settings/pos/tax/add" contentPosition="end">
                <div className="text-end w-full">
                    <PrimaryButton label="Filter" icon="pi pi-filter" onClick={onFilterOpen} className="mx-2 " />
                </div>

                {/* <i className="pi pi-filter" onClick={onFilterOpen}></i> */}
                {/* <CustomDropDown
                    col={12}
                    name="isActive"
                    options={ActiveFilterDropdown}
                    optionLabel="name"
                    value={filters.isActive}
                    onChange={({ name, value }) => onApplyFilters({ [name]: value })}
                /> */}
            </CustomFilterCard>

            <FilterComponent value={filters} onApply={onApplyFilters} visible={isFilterVisible} onHide={onFilterClose} />

            <CustomTable data={events} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default Tax;
