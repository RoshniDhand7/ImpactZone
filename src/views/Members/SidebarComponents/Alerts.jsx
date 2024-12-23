import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlerts } from '../../../redux/actions/MembersPortal/memberPortalActions';
import ProfileDetail from './ProfileDetail';
import CustomTable from '../../../shared/Table/CustomTable';
import { useParams } from 'react-router-dom';
import { dateConversions } from '../../../utils/commonFunctions';

const Alerts = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const tableData = useSelector((state) => state.membersPortal.alerts);

    useEffect(() => {
        dispatch(getAlerts(id));
    }, [dispatch, id]);

    const columns = [
        { field: 'createdAt', body: (r) => dateConversions(r?.createdAt), header: 'Date' },
        {
            field: 'title',
            body: (r) => {
                return <p style={{ color: r?.colorType }}>{r?.title}</p>;
            },
            header: 'Title',
        },
        { field: 'employee', header: 'Employee' },
    ];
    return (
        <div className="">
            <ProfileDetail />
            <CustomTable data={tableData} columns={columns} />
        </div>
    );
};

export default Alerts;
