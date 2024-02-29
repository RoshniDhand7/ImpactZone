import React, { useState, useEffect } from 'react';
import CustomCard, { CustomFilterCard, CustomGridLayout } from '../../../../../shared/Cards/CustomCard';
import CustomEditor from '../../../../../shared/Input/CustomEditor';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../../../../shared/Table/CustomTable';
import CustomDialog from '../../../../../shared/Overlays/CustomDialog';
import { addEmployeeNotes, getEmployeeNotes } from '../../../../../redux/actions/EmployeeSettings/certificationAction';
import moment from 'moment';
import { CustomTextArea } from '../../../../../shared/Input/AllInputs';
import formValidation from '../../../../../utils/validations';
import { showFormErrors } from '../../../../../utils/commonFunctions';

const Notes = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.profile.user);

    useEffect(() => {
        if (user) {
            setData({ ...data, takenBy: user.firstName, dateTime: new Date() });
        }
    }, [user]);
    const [data, setData] = useState({
        takenBy: user?.firstName,
        dateTime: new Date(),
        notes: '',
    });
    const [visible, setVisible] = useState(false);
    const [notesData, setNotesData] = useState([]);
    const funcGetNotes = (id) => {
        dispatch(
            getEmployeeNotes(id, setLoading, (data) => {
                setNotesData(data);
            }),
        );
    };
    useEffect(() => {
        if (id) {
            funcGetNotes(id);
        }
    }, [id, dispatch]);

    const [loading, setLoading] = useState(false);
    const handleChange = ({ name, value }) => {
        const formErrors = formValidation(name, value, data);
        setData((prev) => ({ ...prev, [name]: value, formErrors }));
    };
    const handleSave = () => {
        if (showFormErrors(data, setData)) {
            if (id) {
                dispatch(
                    addEmployeeNotes({ ...data, employee: id }, setLoading, () => {
                        funcGetNotes(id);
                        onClose();
                    }),
                );
            }
        }
    };
    const columns = [
        { field: 'takenBy', header: 'Taken By' },
        { field: 'dateTime', body: (r) => moment(r.dateTime).format('MM-DD-YYYY hh:mm a'), header: 'Date/Time' },
        { field: 'notes', header: 'Notes' },
    ];
    const onClose = () => {
        setData({ notes: '' });
        setVisible(false);
    };

    return (
        <>
            <CustomFilterCard buttonTitle="Add" onClick={() => setVisible(true)} />
            <CustomTable data={notesData} columns={columns} />
            <CustomDialog width="100vh" title={'Add Note'} visible={visible} onCancel={onClose} loading={loading} onSave={handleSave}>
                <CustomGridLayout>
                    <CustomTextArea name="notes" maxLength="266" data={data} onChange={handleChange} inputClass="h-17rem	" />
                </CustomGridLayout>
            </CustomDialog>
        </>
    );
};

export default Notes;
