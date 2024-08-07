import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import CustomTable from '../../../../shared/Table/CustomTable';
import moment from 'moment';
import { deleteAgreementPromotion, getAgreementPromotions } from '../../../../redux/actions/AgreementSettings/agreementPromotions';

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

    return (
        <>
            <CustomFilterCard buttonTitle="Add Agreement Promotions" linkTo="/settings/agreement/agreement-promotions/add" />
            <CustomTable data={allAgreementPromotion} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default AgreementPromotions;
