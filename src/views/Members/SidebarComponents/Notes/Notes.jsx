import ProfileDetail from '../ProfileDetail';
import CustomTable from '../../../../shared/Table/CustomTable';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CustomFilterCard } from '../../../../shared/Cards/CustomCard';
import { getNotes } from '../../../../redux/actions/MembersPortal/memberPortalActions';
import AddNote from './AddNote';
import { dateConversions, getTime } from '../../../../utils/commonFunctions';

const Notes = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const notes = useSelector((state) => state.membersPortal.notes);
    const [openNotes, setOpenNotes] = useState(false);
    const columns = [
        { field: 'createdAt', body: (r) => dateConversions(r?.createdAt), header: 'Date' },
        { field: 'createdAt', body: (r) => getTime(r?.createdAt), header: 'Time' },
        { field: 'name', header: 'Text' },
        { field: 'employee', header: 'User' },
    ];

    useEffect(() => {
        dispatch(getNotes(id));
    }, [dispatch, id]);

    return (
        <div>
            <ProfileDetail />
            <CustomFilterCard buttonTitle="Add Notes" contentPosition="end" onClick={() => setOpenNotes(true)}></CustomFilterCard>
            <CustomTable data={notes} columns={columns} />
            <AddNote openNotes={openNotes} setOpenNotes={setOpenNotes} dispatch={dispatch} id={id} />
        </div>
    );
};

export default Notes;
