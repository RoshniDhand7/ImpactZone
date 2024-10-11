import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Lottie from 'lottie-react';
import { Messages } from 'primereact/messages';
import emptyCartAnimation from '../../../assets/lottie/emptyCart.json';
import PrimaryButton, { CustomButton } from '../../../shared/Button/CustomButton';
import { validatePromoCodeAction } from '../../../redux/actions/POS/PosActions';

export default function CartDetails({ cartDetails, setAppliedPromo, appliedPromo }) {
    const dispatch = useDispatch();
    let { total, tax, discount, specialDiscount, waivedTaxAmount, gradTotal, netTotal } = cartDetails;
    const [promo, setPromo] = useState('');

    const msgs = useRef(null);

    const validatePromo = () => {
        if (promo.trim().length) {
            dispatch(
                validatePromoCodeAction(promo, (res) => {
                    console.log('res==>', res);
                    if (res.success) {
                        setAppliedPromo(res.data);
                        setPromo('');
                    } else {
                        msgs.current.show({ severity: 'error', detail: res?.message });
                    }
                }),
            );
        }
    };

    const onRemovePromo = () => {
        setAppliedPromo(null);
    };
    return (
        <>
            {total ? (
                <>
                    <div className="text-xl font-medium mb-2">
                        <div>Pricing Detail</div>
                    </div>
                    <div className="flex justify-content-between">
                        <div className="text-dark-gray">Net Total:</div>
                        <div className="font-medium ">${netTotal.toFixed(2)}</div>
                    </div>
                    <div className="flex justify-content-between">
                        <div className="text-dark-gray">Tax:</div>
                        <div className="font-medium text-red-600">+${tax.toFixed(2)}</div>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-content-between">
                            <div className="text-dark-gray">Discounts:</div>
                            <div className="font-medium text-green-600">-${discount.toFixed(2)}</div>
                        </div>
                    )}
                    {specialDiscount > 0 && (
                        <div className="flex justify-content-between">
                            <div className="text-dark-gray">Special Discount:</div>
                            <div className="font-medium text-green-600">-${specialDiscount.toFixed(2)}</div>
                        </div>
                    )}
                    {waivedTaxAmount > 0 && (
                        <div className="flex justify-content-between">
                            <div className="text-dark-gray">Waived Tax:</div>
                            <div className="font-medium text-green-600">-${waivedTaxAmount.toFixed(2)}</div>
                        </div>
                    )}
                    {/* <div className="flex justify-content-between">
                        <div className="text-dark-gray">Total:</div>
                        <div className="font-medium ">${total}</div>
                    </div> */}
                    {/* <div className="flex justify-content-between">
                        <div className="text-dark-gray">Account Balance:</div>
                        <div className="font-medium text-red-600">$2.00</div>
                    </div> */}
                    <div className="flex justify-content-between">
                        <div className="text-dark-gray">Final Total:</div>
                        <div className="font-medium ">${gradTotal.toFixed(2)}</div>
                    </div>
                    {/* <div className="flex justify-content-between bg-white py-2 px-3 border-round-md text-lg my-2 ">
                        <div className="text-dark-gray">Pre-Pay Balance</div>
                        <div className="font-medium text-green-600">$2.00</div>
                    </div> */}
                    {appliedPromo ? (
                        <div className="flex justify-content-between bg-white py-2 px-3 border-round-md my-2 border-1 border-green-600 border-dashed ">
                            <div className="text-dark-gray text-green-600">Promo {appliedPromo?.discountCode} Applied</div>
                            <i className="font-medium text-red-600 pi pi-times my-auto" onClick={onRemovePromo}></i>
                        </div>
                    ) : (
                        <div className="flex justify-content-between bg-white py-2 px-3 border-round-md text-lg my-2  ">
                            <input
                                value={promo}
                                onChange={({ target }) => setPromo(target.value)}
                                type="text"
                                className="promo w-10 border-none h-full"
                                placeholder="Apply Promocode"
                            />
                            <div className=" pb-1  px-3 bg-primary-dark text-sm border-round-md text-white cursor-pointer" onClick={validatePromo}>
                                Apply
                            </div>
                        </div>
                    )}
                    <Messages className="promo-error" ref={msgs} />
                </>
            ) : (
                <Lottie animationData={emptyCartAnimation} loop={true} />
            )}
            <div className="flex gap-2 mt-2">
                <PrimaryButton label="Checkout" className="w-full" />
                <CustomButton label="Save" severity="secondary" className="w-full" />
            </div>
        </>
    );
}
