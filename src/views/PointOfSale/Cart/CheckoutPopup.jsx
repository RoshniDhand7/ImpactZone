import React, { useState } from 'react';
import CustomDialog from '../../../shared/Overlays/CustomDialog';
import PrimaryButton, { LightButton } from '../../../shared/Button/CustomButton';

export default function CheckoutPopup({ visible, onCancel }) {
    const [method, setMethod] = useState('CASH');
    const [loading, setLoading] = useState(false);

    const onClose = () => {
        onCancel();
    };
    const onSubmit = () => {
        onCancel();
    };

    return (
        <CustomDialog title="Complete Sale" visible={visible} onCancel={onClose} onSave={onSubmit} saveLabel="Finish" loading={loading} width={'50vw'}>
            <div className="grid">
                <div className="col-2">
                    {method === 'CASH' ? (
                        <PrimaryButton className="w-full px-1" label="Cash" />
                    ) : (
                        <LightButton className="w-full px-1" label="Cash" onClick={() => setMethod('CASH')} />
                    )}
                    {method === 'CHEQUE' ? (
                        <PrimaryButton className="w-full px-1" label="Cheque" />
                    ) : (
                        <LightButton className="w-full px-1" label="Cheque" onClick={() => setMethod('CHEQUE')} />
                    )}

                    <LightButton className="w-full px-1" label="Cheque" />
                    <LightButton className="w-full px-1" label="Pre Pay" />
                    <LightButton className="w-full px-1" label="Club Account" />
                    <LightButton className="w-full px-1" label="Coupon" />
                </div>
                <div className="col flex flex-column pb-1">
                    <div className="text-sm font-semibold mb-1">Payment Method</div>
                    <div className="border-round-md border-1 border-gray-300 py-2 px-3 h-full"></div>
                </div>
            </div>
        </CustomDialog>
    );
}
