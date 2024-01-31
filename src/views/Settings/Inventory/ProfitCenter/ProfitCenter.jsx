import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfitCenter() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(getReasonsDetails());
    }, [dispatch]);

    // const { allProfitCenter } = useSelector((state) => state.ProfitCenter);
    const columns = [
        { field: 'ProfitCenter', header: 'Profit Center Name' },
        { field: 'ProfitCenterType', header: 'Description' },
        { field: 'ProfitCenterType', header: 'Catelog Items Assigned' },
        { field: 'ProfitCenterType', header: 'GL Code' },
        { field: 'isActive', header: 'Active' },
    ];

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                // dispatch(deleteProfitCenter(col._id, () => {}));
            },
            'Do you want to delete this Profit Center?',
            position,
        );
    };
    const onEdit = (col) => {
        history.push(`/settings/inventory/profit-center/edit/${col._id}`);
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Profit Center" linkTo="/settings/inventory/profit-center/add" />
            <CustomTable data={[]} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}
