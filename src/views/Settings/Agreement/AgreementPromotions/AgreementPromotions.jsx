import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import CustomTable from '../../../../shared/Table/CustomTable';
import moment from 'moment';
import { deleteAgreementPromotion, getAgreementPromotions } from '../../../../redux/actions/AgreementSettings/agreementPromotions';
import PrimaryButton from '../../../../shared/Button/CustomButton';
import useFilters from '../../../../hooks/useFilters';
import ActiveFilter from '../../../../components/Filters/ActiveFilter';

const AgreementPromotions = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAgreementPromotions());
    }, [dispatch]);

    const { allAgreementPromotion } = useSelector((state) => state.agreementPromotion);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'code', header: 'Code' },
        { field: 'membershipPlan', header: 'Membership Plan' },
        { field: 'startDate', body: (r) => moment(r.createdAt).format('DD-MM-YYYY'), header: 'StartDate' },
        { field: 'isActive', header: 'Availability' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/agreement/agreement-promotions/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(
                    deleteAgreementPromotion(col._id, () => {
                        dispatch(allAgreementPromotion());
                    }),
                );
            },
            'Do you want to delete this Agreement Promotions ?',
            position,
        );
    };
    const { tableData, onFilterOpen, onFilterClose, onApplyFilters, filters, isFilterVisible } = useFilters(allAgreementPromotion);

    return (
        <>
            <CustomFilterCard buttonTitle="Add Agreement Promotions" linkTo="/settings/agreement/agreement-promotions/add" contentPosition="end">
                <PrimaryButton label="Filters" icon="pi pi-filter" className="mx-2" onClick={onFilterOpen} />
            </CustomFilterCard>
            <ActiveFilter filters={filters} onApplyFilters={onApplyFilters} isFilterVisible={isFilterVisible} onFilterClose={onFilterClose} />

            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default AgreementPromotions;
