import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CustomDialog from '../../../shared/Overlays/CustomDialog';
import { CustomButton } from '../../../shared/Button/CustomButton';
import { CustomCheckbox, CustomInputNumber } from '../../../shared/Input/AllInputs';
import { formatLetter } from '../../../utils/commonFunctions';

export default function CheckoutPopup({ visible, onCancel, cartDetails, onCheckout, memberDetail }) {
    let { tax, discount, specialDiscount, promoDiscount, waivedTaxAmount, gradTotal, netTotal } = cartDetails;
    const [method, setMethod] = useState([]);
    const [printReceiept, setPrintReceiept] = useState(true);
    const [loading, setLoading] = useState(false);
    let paymentMethods = ['CASH', 'CHEQUE', 'CLUB', 'COUPON'];
    if (memberDetail?.prepayBalance) {
        paymentMethods.splice(2, 0, 'PRE_PAY');
    }
    useEffect(() => {
        setMethod([{ type: 'CASH', amount: gradTotal }]);
    }, [gradTotal]);

    const onClose = () => {
        onCancel();
    };
    const onSubmit = () => {
        onCheckout({ paymentType: method, printReceiept }, setLoading);
    };

    const handleMethodToggle = (type) => {
        setMethod((prev) => {
            const exists = prev.find((method) => method.type === type);
            if (exists && prev.length === 1) {
                return prev.map((method) => ({ ...method, amount: gradTotal }));
            }
            if (exists) {
                const remainingMethods = prev.filter((method) => method.type !== type);
                if (remainingMethods.length === 1) {
                    return remainingMethods.map((method) => ({ ...method, amount: gradTotal }));
                }
                const totalRemainingAmount = remainingMethods.reduce((sum, method) => sum + method.amount, 0);
                const removedAmount = exists.amount;
                const adjustedMethods = remainingMethods.map((method) => ({
                    ...method,
                    amount: parseInt(((method.amount / totalRemainingAmount) * (totalRemainingAmount + removedAmount)).toFixed(0)),
                }));

                return adjustedMethods;
            }
            return [...prev, { type, amount: 0 }];
        });
    };
    const handleAmountChange = (type, amount) => {
        adjustAmounts(type, amount, gradTotal);
    };
    const adjustAmounts = useCallback(
        (updatedMethodType, enteredAmount, finalTotal) => {
            setMethod((prev) => {
                const cappedEnteredAmount = Math.min(enteredAmount, finalTotal);
                let remainingTotal = finalTotal - cappedEnteredAmount;
                const updatedMethods = prev.map((method) => (method.type === updatedMethodType ? { ...method, amount: cappedEnteredAmount } : method));
                const otherMethods = updatedMethods.filter((method) => method.type !== updatedMethodType);
                const totalOtherAmounts = otherMethods.reduce((sum, method) => sum + method.amount, 0);
                return updatedMethods.map((method) => {
                    if (method.type === updatedMethodType) {
                        return method;
                    }

                    if (remainingTotal === 0 || totalOtherAmounts === 0) {
                        return { ...method, amount: 0 };
                    }

                    const adjustedAmount = (method.amount / totalOtherAmounts) * remainingTotal;

                    console.log(adjustedAmount);
                    return { ...method, amount: parseInt(adjustedAmount.toFixed(0)) };
                });
            });
        },
        [setMethod],
    );

    console.log(method);

    return (
        <CustomDialog title="Complete Sale" visible={visible} onCancel={onClose} onSave={onSubmit} saveLabel="Finish" loading={loading} width={'60vw'}>
            <div className="grid">
                <div className="col-2">
                    {paymentMethods.map((type) => (
                        <CustomButton
                            key={type}
                            className={`w-full px-4 ${method.find((m) => m.type === type) ? 'btn-dark' : ' btn-lightblue'}`}
                            onClick={() => handleMethodToggle(type)}
                        >
                            {formatLetter(type)}
                        </CustomButton>
                    ))}
                </div>
                <div className="col flex flex-column pb-1">
                    <div className="text-sm font-semibold mb-1">Payment Method</div>
                    <div className="border-round-md border-1 border-gray-300 py-2 px-3 h-full">
                        {method.map((met) => (
                            <div key={met.type} className="flex align-items-center justify-content-between mb-2 mr-5">
                                <div className="mr-2">{met.type}:</div>
                                {console.log(met.amount)}
                                <CustomInputNumber
                                    name={formatLetter(met.type)}
                                    value={met.amount}
                                    onChange={(e) => handleAmountChange(met.type, e.value)}
                                    placeholder="Enter amount"
                                    min={0}
                                    max={gradTotal}
                                    showLabel={false}
                                />
                            </div>
                        ))}
                    </div>
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
