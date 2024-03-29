import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfitCenters, getProfitCenters } from '../../../../redux/actions/InventorySettings/profitCenterAction';

export default function ProfitCenter() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfitCenters());
    }, [dispatch]);

    const { allProfitCenters } = useSelector((state) => state.profitCenter);
    const columns = [
        { field: 'name', header: 'Name', sortable: true },
        { field: 'description', header: 'Description' },
        { field: 'ProfitCenterType', header: 'Catelog Items Assigned' },
        { field: 'glCode', header: 'GL Code', sortable: true },
        { field: 'isActive', header: 'Active' },
    ];

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteProfitCenters(col._id, () => {}));
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
            <CustomTable data={allProfitCenters} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}
