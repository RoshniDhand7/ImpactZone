import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommissionGroups, getCommissionGroups } from '../../../../redux/actions/InventorySettings/commissionGroupAction';

export default function CommissionGroup() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCommissionGroups());
    }, [dispatch]);

    const { allCommissionGroups } = useSelector((state) => state.commissionGroup);
    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'type', header: 'Type' },
        { field: 'isActive', header: 'Active' },
    ];

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteCommissionGroups(col._id, () => {}));
            },
            'Do you want to delete this Commission Group?',
            position,
        );
    };
    const onEdit = (col) => {
        history.push(`/settings/inventory/commission-group/edit/${col._id}`);
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Commission Group" linkTo="/settings/inventory/commission-group/add" />
            <CustomTable data={allCommissionGroups} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}
