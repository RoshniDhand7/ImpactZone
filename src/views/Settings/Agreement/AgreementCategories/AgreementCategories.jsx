import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import ActiveFilter from '../../../../components/Filters/ActiveFilter';
import useFilters from '../../../../hooks/useFilters';
import { deleteAgreementCategories, getAgreementCategories } from '../../../../redux/actions/Settings/AgreementSetup/agreementCategoriesAction';

const AgreementCategories = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAgreementCategories());
    }, [dispatch]);

    const agreementCategories = useSelector((state) => state.settings.agreement.agreementCategories);

    const columns = [
        { field: 'name', header: 'Agreement Categories' },
        {
            field: 'subCategories',
            body: (r) => (r.subCategories ? r.subCategories?.join(' , ') : '-'),
            header: 'Sub Categories',
        },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/agreement/categories/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteAgreementCategories(col._id, () => {}));
            },
            'Do you want to delete this Agreement Categories ?',
            position,
        );
    };
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(agreementCategories);

    return (
        <>
            <CustomFilterCard buttonTitle="Add Agreement Categories" linkTo="/settings/agreement/categories/add" contentPosition="end">
                <PrimaryButton label="Filters" icon="pi pi-filter" className="mx-2" onClick={onFilterOpen} />
            </CustomFilterCard>
            <ActiveFilter filters={filters} onApplyFilters={onApplyFilters} isFilterVisible={isFilterVisible} onFilterClose={onFilterClose} />

            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default AgreementCategories;
