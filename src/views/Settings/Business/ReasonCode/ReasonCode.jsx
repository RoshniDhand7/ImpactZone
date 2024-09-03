import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useHistory } from 'react-router-dom';
import { confirmDelete } from '../../../../utils/commonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReasonCode, getReasonsDetails } from '../../../../redux/actions/BusinessSettings/reasonActions';

export default function ReasonCode() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getReasonsDetails());
    }, [dispatch]);

    const { allReasonCode } = useSelector((state) => state.reasonCode);
    const columns = [
        { field: 'reasonCode', header: 'Name' },
        { field: 'reasonCodeType', header: 'Type' },
    ];

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(deleteReasonCode(col._id, () => {}));
            },
            'Do you want to delete this Reason Code?',
            position,
        );
    };
    const onEdit = (col) => {
        history.push(`/settings/business/reason-code/edit/${col._id}`);
    };
    return (
        <>
            <CustomFilterCard buttonTitle="Add Reason Code" linkTo="/settings/business/reason-code/add" />
            <CustomTable data={allReasonCode} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
}
