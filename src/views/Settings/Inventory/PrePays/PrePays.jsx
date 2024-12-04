import React from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deletePrePay, getPrePays } from '../../../../redux/actions/Settings/InventorySetup/prePayActions';

export default function PrePays() {
    const history = useHistory();
    const dispatch = useDispatch();

    const tableData = useSelector((state) => state.settings.inventory.prePays);

    useEffect(() => {
        dispatch(getPrePays());
    }, [dispatch]);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'netPrice', header: 'Amount' },
        { field: 'isActive', header: 'Active' },
    ];

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deletePrePay(col._id));
            },
            'Do you want to delete this Pre Pay?',
            position,
        );
    };
    const onEdit = (col) => {
        history.push(`/settings/inventory/pre-pay/edit/${col._id}`);
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Pre Pay" linkTo="/settings/inventory/pre-pay/add" contentPosition="end"></CustomFilterCard>
            <CustomTable data={tableData} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}
