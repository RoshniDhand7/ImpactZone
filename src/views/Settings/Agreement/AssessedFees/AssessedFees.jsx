import React, { useEffect } from 'react';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDelete } from '../../../../utils/commonFunctions';
import CustomTable from '../../../../shared/Table/CustomTable';
import { deleteAssessedFees, getAssesedFees } from '../../../../redux/actions/AgreementSettings/assessedFees';
import moment from 'moment';

const AssessedFees = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAssesedFees());
    }, [dispatch]);

    const { allAssessedFees } = useSelector((state) => state.assessedFees);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'profitCenter', header: 'Profit Center' },
        { field: 'amount', header: 'Amount' },
        { field: 'createdAt', body: (r) => moment(r.createdAt).format('DD-MM-YYYY'), header: 'Start Date' },
        {
            field: 'clubs',
            body: (r) => r?.clubs?.map((item) => item.name).join(','),
            header: 'Clubs',
        },
        { field: 'isActive', header: 'Active' },
    ];

    const onEdit = (col) => {
        history.push(`/settings/agreement/assessed-fees/edit/${col._id}`);
    };

    const onDelete = (col, position) => {
        confirmDelete(
            () => {
                dispatch(
                    deleteAssessedFees(col._id, () => {
                        dispatch(getAssesedFees());
                    }),
                );
            },
            'Do you want to delete this AssessedFees ?',
            position,
        );
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add Assessed Fees" linkTo="/settings/agreement/assessed-fees/add" />
            <CustomTable data={allAssessedFees} columns={columns} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default AssessedFees;
