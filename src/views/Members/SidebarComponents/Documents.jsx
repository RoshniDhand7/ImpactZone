import ProfileDetail from './ProfileDetail';
import TopLayout from './TopLayout';
import viewIcon from '../../../assets/icons/view.png';
import CustomTable from '../../../shared/Table/CustomTable';
import moment from 'moment';
import { useEffect } from 'react';
import { getDocuments } from '../../../redux/actions/MembersPortal/memberPortalActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Documents = ({ data = {} }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const documents = useSelector((state) => state.membersPortal.documents);
    const columns = [
        { field: 'member', header: 'Member Name' },
        { field: 'name', header: 'File Name' },
        { field: 'govtId', header: 'Govt Id' },
        { field: 'type', header: 'Type' },
        { field: 'createdAt', header: 'Created At', body: (r) => moment(r?.createdAt).format('DD-MM-YYYY') },
        // { field: 'url', header: 'Renewal Frequency', body: () => '-' },
    ];

    useEffect(() => {
        dispatch(getDocuments(id));
    }, []);

    return (
        <div>
            <ProfileDetail />
            <TopLayout />
            <CustomTable
                data={documents}
                columns={columns}
                onView={(data) => {
                    console.log('view data', data);
                }}
            />
        </div>
    );
};

export default Documents;
