import React, { useState } from 'react';
import CustomDialog from '../../../shared/Overlays/CustomDialog';
import PrimaryButton, { LightButton } from '../../../shared/Button/CustomButton';
import { CustomCheckbox } from '../../../shared/Input/AllInputs';

export default function CheckoutPopup({ visible, onCancel, cartDetails, onCheckout }) {
    let { tax, discount, specialDiscount, promoDiscount, waivedTaxAmount, gradTotal, netTotal } = cartDetails;
    const [method, setMethod] = useState('CASH');
    const [printReceiept, setPrintReceiept] = useState(true);
    const [loading, setLoading] = useState(false);

    const onClose = () => {
        onCancel();
    };
    const onSubmit = () => {
        onCheckout({ method, printReceiept }, setLoading);
    };

    return (
        <CustomDialog title="Complete Sale" visible={visible} onCancel={onClose} onSave={onSubmit} saveLabel="Finish" loading={loading} width={'60vw'}>
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
            <div className="grid">
                <div className="col-2">
                    <CustomCheckbox
                        label="printReceiept"
                        col={12}
                        value={printReceiept}
                        onChange={({ value }) => {
                            setPrintReceiept(value);
                        }}
                    />
                </div>
                <div className="col">
                    <div className="border-round-md border-1 border-gray-300 py-2 px-3">
                        <div className="flex justify-content-between">
                            <div className="text-dark-gray">Net Total:</div>
                            <div className="font-medium ">${netTotal?.toFixed(2)}</div>
                        </div>
                        <div className="flex justify-content-between">
                            <div className="text-dark-gray">Tax:</div>
                            <div className="font-medium text-red-600">+${tax?.toFixed(2)}</div>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-content-between">
                                <div className="text-dark-gray">Discounts:</div>
                                <div className="font-medium text-green-600">-${discount?.toFixed(2)}</div>
                            </div>
                        )}
                        {specialDiscount > 0 && (
                            <div className="flex justify-content-between">
                                <div className="text-dark-gray">Special Discount:</div>
                                <div className="font-medium text-green-600">-${specialDiscount?.toFixed(2)}</div>
                            </div>
                        )}
                        {promoDiscount > 0 && (
                            <div className="flex justify-content-between">
                                <div className="text-dark-gray">Promo Discount:</div>
                                <div className="font-medium text-green-600">-${promoDiscount?.toFixed(2)}</div>
                            </div>
                        )}
                        {waivedTaxAmount > 0 && (
                            <div className="flex justify-content-between">
                                <div className="text-dark-gray">Waived Tax:</div>
                                <div className="font-medium text-green-600">-${waivedTaxAmount?.toFixed(2)}</div>
                            </div>
                        )}
                        <div className="flex justify-content-between">
                            <div className="text-dark-gray">Final Total:</div>
                            <div className="font-medium ">${gradTotal?.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </CustomDialog>
    );
}
