import React, { useState } from 'react';
import CustomDialog from '../../../shared/Overlays/CustomDialog';

export default function CheckoutPopup({ visible, onCancel }) {
    const [data, setData] = useState({ paymentType: '', emailre: '' });
    const [loading, setLoading] = useState(false);

    const onClose = () => {
        onCancel();
    };
    const onSubmit = () => {
        onCancel();
    };
    return (
        <CustomDialog title="Complete Sale" visible={visible} onCancel={onClose} onSave={onSubmit} saveLabel="Finish" loading={loading}>
            CheckoutPopup
        </CustomDialog>
    );
}
