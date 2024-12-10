import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckIn } from '../../../redux/actions/MembersPortal/memberPortalActions';
import ProfileDetail from './ProfileDetail';
import CustomTable from '../../../shared/Table/CustomTable';
import { useParams } from 'react-router-dom';
import { getDateandTime } from '../../../utils/commonFunctions';

const CheckIn = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const tableData = useSelector((state) => state.membersPortal.checkIn);

    useEffect(() => {
        dispatch(getCheckIn(id));
    }, [dispatch, id]);

    const columns = [
        {
            field: 'createdAt',
            header: 'Date',
            body: (r) => getDateandTime(r?.createdAt),
        },
        { field: 'club', header: 'Club' },
        { field: '', header: 'Alerts' },
        { field: '', header: 'Service Used' },
        { field: '', header: 'Service Employee' },
        { field: '', header: 'Staff User' },
    ];

    return (
        <>
            <ProfileDetail />
            <CustomTable data={tableData} columns={columns} />
        </>
    );
};

export default CheckIn;
