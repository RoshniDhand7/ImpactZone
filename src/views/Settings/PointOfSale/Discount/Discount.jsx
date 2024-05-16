import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteDiscountType, getDiscountTypes } from '../../../../redux/actions/PosSettings/discountType';
import moment from 'moment';

const Discount = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDiscountTypes());
    }, [dispatch]);

    const { allDiscountTypes } = useSelector((state) => state.discountType);
    console.log(allDiscountTypes);

    const columns = [
        { field: 'discountName', header: 'Name' },
        { field: 'description', header: 'Description' },
        { field: 'percentage', body: (r) => r.percentage + '%', header: 'Discount' },
        { field: 'startDate', body: (r) => moment(r.startDate).format('DD-MM-YYYY'), header: 'Start Date' },
        { field: 'endDate', body: (r) => moment(r.endDate).format('DD-MM-YYYY'), header: 'End Date' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/pos/discount/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteDiscountType(col._id, () => {}));
            },
            'Do you want to delete this delete Discount ?',
            position,
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Discount Type" linkTo="/settings/pos/discount/add" />
            <CustomTable data={allDiscountTypes} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default Discount;
