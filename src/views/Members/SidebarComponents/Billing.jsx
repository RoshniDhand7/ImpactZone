import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../../redux/actions/MembersPortal/memberPortalActions';
import ProfileDetail from './ProfileDetail';
import CustomTable from '../../../shared/Table/CustomTable';
import { useParams } from 'react-router-dom';
import { dateConversions, formatLetter } from '../../../utils/commonFunctions';

const Billing = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const tableData = useSelector((state) => state.membersPortal.transactions);

    useEffect(() => {
        dispatch(getTransactions(id));
    }, [dispatch, id]);

    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'createdAt', body: (r) => dateConversions(r?.createdAt), header: 'Date' },
        { field: 'netPrice', body: (r) => `$${r?.netPrice}`, header: 'Net Price' },
        {
            field: 'type',
            body: (r) => formatLetter(r?.type),
            header: 'Type',
        },
    ];
    return (
        <div className="">
            <ProfileDetail />
            <CustomTable data={tableData} columns={columns} />
        </div>
    );
};

export default Billing;
