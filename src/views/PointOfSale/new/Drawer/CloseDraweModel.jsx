import React from 'react';
import CustomDialog from '../../../../shared/Overlays/CustomDialog';

export default function CloseDraweModel({ visible, setVisible }) {
    const onClose = () => {
        setVisible(false);
    };
    const handleSave = () => {
        setVisible(false);
    };
    return <CustomDialog title="Close Register" visible={visible} onCancel={onClose} onSave={handleSave} saveLabel="Close Drawer"></CustomDialog>;
}
