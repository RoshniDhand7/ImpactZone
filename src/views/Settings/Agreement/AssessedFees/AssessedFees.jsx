import React, { useEffect, useState } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import CustomTable from '../../../../shared/Table/CustomTable';

const AssessedFees = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(getMembersipTypes());
    }, [dispatch]);

    const { allMembershipTypes } = useSelector((state) => state.membershipTypes);
    const { loading } = useSelector((state) => state?.loader?.isLoading);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'description', header: 'Profit Center' },
        { field: 'shortName', header: 'Amount' },
        { field: 'shortName', header: 'Start Date' },
        { field: 'shortName', header: 'Clubs' },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/members/membership-types/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                // dispatch(deleteMembershipType(col._id, () => {}));
            },
            'Do you want to delete this AssessedFees ?',
            position,
        );
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Assessed Fees" linkTo="/settings/agreement/assessed-fees/add" />
            <CustomTable data={allMembershipTypes} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default AssessedFees;
