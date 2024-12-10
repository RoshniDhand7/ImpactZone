import ProfileDetail from '../ProfileDetail';
import CustomTable from '../../../../shared/Table/CustomTable';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getDocuments } from '../../../../redux/actions/MembersPortal/memberPortalActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import DocumentView from './DocumentView';
import AddDocument from './AddDocument';

const Documents = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const documents = useSelector((state) => state.membersPortal.documents);
    const [document, setOpenDocument] = useState(false);
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
    }, [dispatch, id]);

    const [openViewModal, setOpenViewModal] = useState(false);
    const [viewData, setViewData] = useState(null);

    const handleView = (r) => {
        setOpenViewModal(true);
        setViewData(r);
    };

    return (
        <div>
            <ProfileDetail />
            <CustomFilterCard buttonTitle="Add Documents" contentPosition="end" onClick={() => setOpenDocument(true)}></CustomFilterCard>
            <CustomTable data={documents} columns={columns} onView={handleView} />
            <AddDocument document={document} setOpenDocument={setOpenDocument} dispatch={dispatch} id={id} />
            <DocumentView viewData={viewData} setViewData={setViewData} openViewModal={openViewModal} setOpenViewModal={setOpenViewModal} />
        </div>
    );
};

export default Documents;
