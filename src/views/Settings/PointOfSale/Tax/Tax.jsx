import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteTax, getTaxes } from '../../../../redux/actions/PosSettings/tax';
import useFilters from '../../../../hooks/useFilters';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import TaxFilter from './TaxFilter';

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
            </CustomFilterCard>
            <TaxFilter onFilterClose={onFilterClose} onApplyFilters={onApplyFilters} filters={filters} isFilterVisible={isFilterVisible} />
            {/* <SideBarFilters>
                <div>
                    <CustomDropDown col={12} name="isActive" options={ActiveFilterDropdown} optionLabel="name" data={data} onChange={handleChange} showClear />
                    <CustomMultiselect col={12} name="club" options={clubsDropdown} data={data} onChange={handleChange} />
                </div>
            </SideBarFilters> */}
            <CustomTable data={events} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default Tax;
