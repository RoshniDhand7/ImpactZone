import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { deleteTax, getTaxes } from '../../../../redux/actions/PosSettings/tax';

const Tax = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTaxes());
    }, [dispatch]);

    const { allTaxes } = useSelector((state) => state.taxes);

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
                dispatch(deleteTax(col._id, () => {}));
            },
            'Do you want to delete this Tax ?',
            position,
        );
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Tax" linkTo="/settings/pos/tax/add" />
            <CustomTable data={allTaxes} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default Tax;
