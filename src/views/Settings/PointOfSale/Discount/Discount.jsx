import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';

const Discount = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(getPaymentMethods());
    }, [dispatch]);

    // const { allPaymentMethod } = useSelector((state) => state.paymentMethod);
    // console.log(allPaymentMethod);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'detail', header: 'Description' },
        { field: 'code', header: 'Discount' },
        { field: 'count', header: 'Start Date' },
        { field: 'income', header: 'End Date' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/pos/discount/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                // dispatch(deletePaymentMethod(col._id, () => {}));
            },
            'Do you want to delete this delete Discount ?',
            position,
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Discount Type" linkTo="/settings/pos/discount/add" />
            <CustomTable data={[]} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default Discount;
