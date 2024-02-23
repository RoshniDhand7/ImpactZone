import React, { useState, useEffect } from 'react';
import CustomCard, { CustomFilterCard, CustomGridLayout } from '../../../../../shared/Cards/CustomCard';
import CustomEditor from '../../../../../shared/Input/CustomEditor';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editEmployee, getEmployee } from '../../../../../redux/actions/EmployeeSettings/employeesAction';
import CustomTable from '../../../../../shared/Table/CustomTable';
import CustomDialog from '../../../../../shared/Overlays/CustomDialog';
import { addEmployeeNotes, getEmployeeNotes } from '../../../../../redux/actions/EmployeeSettings/certificationAction';
import moment from 'moment';

const Notes = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user= useSelector((state)=>state.profile.user)

    useEffect(()=>{
        if(user){
            setData({...data,takenBy:user.firstName})   
        }
    },[user])
    const [data, setData] = useState({
        takenBy:user?.firstName,
        dateTime:moment(new Date()).format("YYYY-MM-DD"),
        notes: '',
    });
    const [visible, setVisible] = useState(false);
    const [notesData, setNotesData] = useState([]);
    const funcGetNotes = (id) => {
        dispatch(
            getEmployeeNotes(id,  setLoading, (data) => {
                setNotesData(data);
            }),
        );
    };
    useEffect(() => {
        if (id) {
            funcGetNotes(id)   
        }
    }, [id, dispatch]);

    const [loading, setLoading] = useState(false);
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSave = () => {
        if (id) {
            dispatch(addEmployeeNotes({ ...data }, setLoading, () => {
                funcGetNotes(id);
                onClose();
            }));
        }
    };
    const columns = [
        { field: 'takenBy', header: 'Taken By' },
        { field: 'dateTime', header: 'Date/Time' },
        { field: 'notes', header: 'Notes' },
    ];
    const onClose = () => {
        setData({ notes: '',});
        setVisible(false);
    };

    return (
        <>
         <CustomFilterCard buttonTitle="Add" onClick={() => setVisible(true)} />
            <CustomTable data={notesData} columns={columns}  />
            <CustomDialog width="100vh" title={ 'Add'} visible={visible} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                <CustomEditor name="notes" onTextChange={handleChange} data={data} />
                </CustomGridLayout>
            </CustomDialog>
           
        </>
    );
};

export default Notes;
