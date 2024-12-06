import ProfileDetail from '../ProfileDetail';
import TopLayout from '../TopLayout';
import CustomTable from '../../../../shared/Table/CustomTable';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { getNotes } from '../../../../redux/actions/MembersPortal/memberPortalActions';
import AddNote from './AddNote';

const Notes = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const notes = useSelector((state) => state.membersPortal.notes);
    const [openNotes, setOpenNotes] = useState(false);
    const columns = [
        { field: 'createdAt', body: (r) => moment(r?.createdAt).format('MMMM-DD-YYYY'), header: 'Date' },
        { field: 'createdAt', body: (r) => moment(r?.createdAt).format('hh:mm A'), header: 'Time' },
        { field: 'name', header: 'Text' },
        { field: 'member', header: 'User' },
    ];

    useEffect(() => {
        dispatch(getNotes(id));
    }, [dispatch, id]);

    return (
        <div>
            <ProfileDetail />
            <TopLayout />
            <CustomFilterCard buttonTitle="Add Notes" contentPosition="end" onClick={() => setOpenNotes(true)}></CustomFilterCard>
            <CustomTable data={notes} columns={columns} />
            <AddNote openNotes={openNotes} setOpenNotes={setOpenNotes} dispatch={dispatch} id={id} />
        </div>
    );
};

export default Notes;
