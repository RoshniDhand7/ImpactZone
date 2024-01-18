import React, { useState } from 'react';
import CustomCard from '../../../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButtonGroup, LightButton } from '../../../../../shared/Button/CustomButton';
import CustomEditor from '../../../../../shared/Input/CustomEditor';

const Notes = () => {
    const [notes, setNotes] = useState('');
    const handleNotesChange = (e) => {
        setNotes(e);
    };
    return (
        <>
            <CustomCard col="12" title="Notes">
                <CustomEditor onTextChange={handleNotesChange} value={notes} />
            </CustomCard>
            <CustomButtonGroup>
                <PrimaryButton label="Save" className="mx-2" />
                <LightButton label="Cancel" />
            </CustomButtonGroup>
        </>
    );
};

export default Notes;
