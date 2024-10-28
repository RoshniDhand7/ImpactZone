import React from 'react';
import CustomDialog from '../../../shared/Overlays/CustomDialog';
import { CustomInput } from '../../../shared/Input/AllInputs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { onSaveCartAction } from '../../../redux/actions/POS/savedCartActions';
import { showToast } from '../../../redux/actions/toastAction';

export default function SaveCartPopup({ visible, onCancel, onCartSaved, details }) {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = ({ name, value }) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const onSave = () => {
        if (data.name) {
            if (details?.selectedMember) {
                let payload = {
                    member: details?.selectedMember,
                    name: data?.name,
                    amount: details?.cartDetails?.gradTotal,
                    items: details?.selectedItems,
                };
                dispatch(
                    onSaveCartAction(payload, setLoading, () => {
                        onCartSaved();
                        setData({ name: '' });
                    }),
                );
            } else {
                dispatch(showToast({ severity: 'warn', summary: 'Member not selected.' }));
            }
        }
    };

    return (
        <CustomDialog title="Save Cart" visible={visible} onCancel={onCancel} onSave={onSave} loading={loading}>
            <CustomInput col={12} data={data} onChange={handleChange} name="name" />
        </CustomDialog>
    );
}
