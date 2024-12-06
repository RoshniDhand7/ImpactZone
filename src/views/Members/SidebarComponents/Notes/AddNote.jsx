import React, { useState } from 'react';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';
import { CustomTextArea } from '../../../../shared/Input/AllInputs';
import { addMemberNotes, getNotes } from '../../../../redux/actions/MembersPortal/memberPortalActions';
import { showFormErrors } from '../../../../utils/commonFunctions';

const AddNote = ({ openNotes, setOpenNotes, dispatch, id }) => {
    const [loading, setLoading] = useState(false);
    const initialState = {
        name: '',
    };

    const [data, setData] = useState(initialState);
    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (showFormErrors(data, setData)) {
            dispatch(
                addMemberNotes(id, data, setLoading, () => {
                    dispatch(getNotes(id));
                    setData(initialState);
                    setOpenNotes(false);
                }),
            );
        }
    };
    return (
        <>
            <CustomDialog
                width="85vh"
                title={' Add Note'}
                visible={openNotes}
                onCancel={() => {
                    setOpenNotes(false);
                }}
                loading={loading}
                onSave={handleSave}
            >
                <CustomTextArea name="name" label="Note" maxLength="266" data={data} onChange={handleChange} inputClass="h-17rem	" />
            </CustomDialog>
        </>
    );
};

export default AddNote;
