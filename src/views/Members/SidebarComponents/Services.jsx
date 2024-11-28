import moment from 'moment';
import { CusomCardBlue } from '../../../shared/Cards/CustomCard';
import CustomTable from '../../../shared/Table/CustomTable';
import ProfileDetail from './ProfileDetail';
import TopLayout from './TopLayout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../../redux/actions/MembersPortal/memberPortalActions';

const Services = () => {
    const dispatch = useDispatch();
    const tableData = useSelector((state) => state.membersPortal.services);

    useEffect(() => {
        dispatch(getServices());
    }, []);

    const columns = [
        { field: 'service', header: 'Service', style: { width: '300px' } },
        { field: 'date', header: 'Date', body: (r) => moment(r?.date).format('DD-MM-YYYY'), style: { width: '150px' } },
        { field: 'primaryPhone', header: 'Receipt#', body: () => '-' },
        { field: 'netPrice', header: 'Price', body: (r) => '$' + r.netPrice },
        { field: 'primaryPhone', header: 'Expiration Date', body: () => '-' },
        { field: 'primaryPhone', header: 'Sessions Purchased', body: () => '-' },
        { field: 'primaryPhone', header: 'Sessions Completed', body: () => '-' },
        { field: 'primaryPhone', header: 'Pending Sessions', body: () => '-' },
        { field: 'primaryPhone', header: 'Remaining Sessions', body: () => '-' },
        { field: 'terminationDate', header: 'Termination Date', body: () => '-' },
    ];

    return (
        <div className="">
            <ProfileDetail />
            <TopLayout />
            <CusomCardBlue>Purchase History</CusomCardBlue>
            <CustomTable data={tableData} columns={columns} />
        </div>
    );
};

export default Services;
