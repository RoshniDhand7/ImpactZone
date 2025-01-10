import { CusomCardBlue } from '../../../shared/Cards/CustomCard';
import CustomTable from '../../../shared/Table/CustomTable';
import ProfileDetail from './ProfileDetail';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../../redux/actions/MembersPortal/memberPortalActions';
import { dateConversions } from '../../../utils/commonFunctions';
import { useParams } from 'react-router-dom';

const Services = () => {
    const dispatch = useDispatch();
    const tableData = useSelector((state) => state.membersPortal.services);

    const { id } = useParams();

    useEffect(() => {
        dispatch(getServices(id));
    }, [dispatch]);

    const columns = [
        { field: 'service', header: 'Service', style: { width: '300px' } },
        { field: 'date', header: 'Date', body: (r) => dateConversions(r?.date), style: { width: '150px' } },
        { field: 'primaryPhone', header: 'Receipt#', body: () => '#RC3234' },
        { field: 'netPrice', header: 'Price', body: (r) => (r.netPrice ? '$' + r.netPrice : '-') },
        { field: 'primaryPhone', header: 'Expiration Date', body: () => '-' },
        { field: 'sessionPurchase', header: 'Sessions Purchased' },
        { field: 'primaryPhone', header: 'Sessions Completed', body: () => '-' },
        { field: 'primaryPhone', header: 'Pending Sessions', body: () => '-' },
        { field: 'primaryPhone', header: 'Remaining Sessions', body: () => '-' },
        { field: 'terminationDate', header: 'Termination Date', body: () => '-' },
    ];

    return (
        <div className="">
            <ProfileDetail />
            <CusomCardBlue>Purchase History</CusomCardBlue>
            <CustomTable data={tableData} columns={columns} />
        </div>
    );
};

export default Services;
