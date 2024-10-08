import React, { useEffect, useState } from 'react';
import CustomCard from '../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButton } from '../../../shared/Button/CustomButton';
import { confirmPopup } from 'primereact/confirmpopup';
import Lottie from 'lottie-react';
import emptyCartAnimation from '../../../assets/lottie/emptyCart.json';
import { useDispatch } from 'react-redux';
import { getDiscountTypes } from '../../../redux/actions/PosSettings/discountType';
import SelectDiscountPopup from './SelectDiscountPopup';
import SpecialDiscountPopup from './SpecialDiscountPopup';

export default function Cart({ cartItems, setSelectedItems, cartDetails }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDiscountTypes());
    }, [dispatch]);

    const onDeleteCartItem = (index) => {
        setSelectedItems((prev) => {
            let _arr = [...prev];
            _arr.splice(index, 1);
            return _arr;
        });
    };

    const onQtyChange = (index, qty) => {
        setSelectedItems((prev) => {
            let _prev = [...prev];
            _prev[index].quantity = qty;

            return _prev;
        });
    };

    const onWaiveTax = (index, condition) => {
        setSelectedItems((prev) => {
            let _arr = [...prev];
            let _obj = _arr[index];
            _obj.taxWaived = condition;
            _arr[index] = _obj;
            return _arr;
        });
    };
    const [discountPopup, setDiscountPopup] = useState(false);
    const [specialDiscountPopup, setSpecialDiscountPopup] = useState(false);

    const onOverrideDiscount = (index, item) => {
        setDiscountPopup({ index, item });
    };
    const onAddSpecialDiscount = (index, item) => {
        setSpecialDiscountPopup({ index, item });
    };

    const onApplyDiscount = (index, discount) => {
        setSelectedItems((prev) => {
            let _arr = [...prev];
            let _obj = _arr[index];
            _obj.defaultDiscount = discount;
            _arr[index] = _obj;
            return _arr;
        });
    };
    const onApplySpecialDiscount = (index, discount) => {
        setSelectedItems((prev) => {
            let _arr = [...prev];
            let _obj = _arr[index];
            _obj.specialDiscount = discount;
            _arr[index] = _obj;
            return _arr;
        });
    };

    const onRemoveSpecialDiscount = (index) => {
        setSelectedItems((prev) => {
            let _arr = [...prev];
            let _obj = _arr[index];
            _obj.specialDiscount = null;
            _arr[index] = _obj;
            return _arr;
        });
    };

    return (
        <>
            <SelectDiscountPopup visible={discountPopup} setVisible={setDiscountPopup} onApply={onApplyDiscount} />
            <SpecialDiscountPopup visible={specialDiscountPopup} setVisible={setSpecialDiscountPopup} onApply={onApplySpecialDiscount} />
            <CustomCard title="Cart" col={12}>
                {cartItems?.map((item, i) => (
                    <CartItem
                        key={item?._id}
                        index={i}
                        item={item}
                        onDeleteCartItem={onDeleteCartItem}
                        onQtyChange={onQtyChange}
                        onWaiveTax={onWaiveTax}
                        onOverrideDiscount={onOverrideDiscount}
                        onAddSpecialDiscount={onAddSpecialDiscount}
                        onRemoveSpecialDiscount={onRemoveSpecialDiscount}
                    />
                ))}
                <CartDetails cartDetails={cartDetails} />
            </CustomCard>
        </>
    );
}

function CartItem(props) {
    const { onDeleteCartItem, onWaiveTax, onQtyChange, onOverrideDiscount, onAddSpecialDiscount, onRemoveSpecialDiscount } = props;
    const { item, index } = props;
    const { itemCaption, name, taxWaived } = item;
    const { allowDiscount, defaultDiscount, overrideDiscount, specialDiscount } = item;
    const { waivedTaxAmount, netPrice, finalNetPrice, finalTotal } = item;
    const { minimumQuantity, maximumQuantity, quantity, allowUnlimited } = item;

    const onDelete = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this item?',
            icon: 'pi pi-info-circle',
            rejectClassName: 'p-button p-button-outlined p-button-secondary',
            acceptClassName: 'btn-dark',
            defaultFocus: 'reject',
            accept: () => {
                onDeleteCartItem(index);
            },
            reject: () => {},
        });
    };
    const applyTax = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to apply tax on this item?',
            icon: 'pi pi-info-circle',
            rejectClassName: 'p-button p-button-outlined p-button-secondary',
            acceptClassName: 'btn-dark',
            defaultFocus: 'reject',
            accept: () => {
                onWaiveTax(index, false);
            },
            reject: () => {},
        });
    };
    const waiveTax = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to waive tax on this item?',
            icon: 'pi pi-info-circle',
            rejectClassName: 'p-button p-button-outlined p-button-secondary',
            acceptClassName: 'btn-dark',
            defaultFocus: 'reject',
            accept: () => {
                onWaiveTax(index, true);
            },
            reject: () => {},
        });
    };
    const onInc = () => {
        let _qty = quantity + 1;
        if (_qty <= maximumQuantity || allowUnlimited) {
            onQtyChange(index, _qty);
        }
    };
    const onDec = () => {
        let _qty = quantity - 1;
        if (_qty >= minimumQuantity) {
            onQtyChange(index, _qty);
        }
    };
    const showDiscountMenu = () => {
        if (allowDiscount && !defaultDiscount) {
            onOverrideDiscount(index, defaultDiscount);
        } else if (defaultDiscount && overrideDiscount) {
            onOverrideDiscount(index, defaultDiscount);
        }
    };
    const showSpecialDiscount = () => {
        if (allowDiscount) {
            onAddSpecialDiscount(index, specialDiscount);
        }
    };

    const removeSpecialDiscount = () => {
        onRemoveSpecialDiscount(index);
    };

    return (
        <>
            <div className="flex justify-content-between text-xl font-medium">
                <div>{name}</div>
                <div>${finalTotal}</div>
            </div>
            <div className="text-dark-gray ellipsis-text w-9">{itemCaption}</div>
            <div className="flex justify-content-between">
                <div className="flex">
                    <div className="mr-2 text-lg font-medium my-auto">${finalNetPrice}</div>
                    {finalNetPrice !== netPrice && <div className="mr-2 text-lg font-medium line-through text-dark-gray my-auto">${netPrice}</div>}
                    {allowDiscount && defaultDiscount && (
                        <div className="bg-green-100 text-green-900 border-round-sm px-1 my-auto">
                            {defaultDiscount?.amountType === 'PERCENTAGE' && `${defaultDiscount?.amount}% OFF`}
                            {defaultDiscount?.amountType === 'FIXED' && `$${defaultDiscount?.amount} OFF`}
                        </div>
                    )}
                    {specialDiscount && (
                        <div className="bg-green-100 text-green-900 border-round-sm px-1 ml-2 my-auto">
                            Special {specialDiscount?.amountType === 'PERCENTAGE' && `${specialDiscount?.amount}% OFF`}
                            {specialDiscount?.amountType === 'FIXED' && `$${specialDiscount?.amount} OFF`}
                            <i className="pi pi-times ml-2 cursor-pointer" onClick={removeSpecialDiscount}></i>
                        </div>
                    )}
                </div>

                <div className="flex gap-2 align-items-center">
                    <i className={`pi pi-minus-circle text-xl text-gray-400 text-red-600 `} onClick={onDec}></i>
                    <div className="text-xl font-medium text-center" style={{ minWidth: '20px' }}>
                        {quantity}
                    </div>
                    <i className={`pi pi-plus-circle text-xl text-gray- text-green-600`} onClick={onInc}></i>
                </div>
            </div>
            <div className="flex justify-content-between my-3 ">
                <div className="flex">
                    {taxWaived ? (
                        <div className="py-1 px-3 bg-green-100 text-green-900 border-round-md mr-2 cursor-pointer" onClick={applyTax}>
                            ${waivedTaxAmount} Tax Waived
                        </div>
                    ) : (
                        <div className="py-1 px-3 bg-primary-dark border-round-md mr-2 text-white cursor-pointer" onClick={waiveTax}>
                            % Waive Tax
                        </div>
                    )}
                    {allowDiscount && (
                        <>
                            <div className="py-1 px-3 border-400 border-round-md mr-2 border-1 cursor-pointer" onClick={showDiscountMenu}>
                                {defaultDiscount ? (
                                    `${defaultDiscount?.discountCode} Applied`
                                ) : (
                                    <>
                                        <i className="pi pi-dollar"></i>
                                        Apply Discount
                                    </>
                                )}
                                {overrideDiscount && <i className="ml-3 my-auto pi pi-chevron-circle-down"></i>}
                            </div>
                        </>
                    )}
                    {allowDiscount && (
                        <>
                            <div className="py-1 px-2 bg-blue-100 border-round-md cursor-pointer" onClick={showSpecialDiscount}>
                                <i className="pi pi-gift text-xl text-blue-600"></i>
                            </div>
                        </>
                    )}
                </div>

                <div className="py-1 px-2 bg-red-100 border-round-md cursor-pointer" onClick={onDelete}>
                    <i className="pi pi-trash text-xl text-red-600"></i>
                </div>
            </div>
            <hr />
            <br />
        </>
    );
}
function CartDetails({ cartDetails }) {
    let { total, tax, discount, specialDiscount, waivedTaxAmount, gradTotal, netTotal } = cartDetails;
    return (
        <div>
            {total ? (
                <>
                    <div className="text-xl font-medium mb-2">
                        <div>Pricing Detail</div>
                    </div>
                    <div className="flex justify-content-between">
                        <div className="text-dark-gray">Net Total:</div>
                        <div className="font-medium ">${netTotal}</div>
                    </div>
                    <div className="flex justify-content-between">
                        <div className="text-dark-gray">Tax:</div>
                        <div className="font-medium text-red-600">+${tax}</div>
                    </div>
                    {discount > 0 && (
                        <div className="flex justify-content-between">
                            <div className="text-dark-gray">Discounts:</div>
                            <div className="font-medium text-green-600">-${discount}</div>
                        </div>
                    )}
                    {specialDiscount > 0 && (
                        <div className="flex justify-content-between">
                            <div className="text-dark-gray">Special Discount:</div>
                            <div className="font-medium text-green-600">-${specialDiscount}</div>
                        </div>
                    )}
                    {waivedTaxAmount > 0 && (
                        <div className="flex justify-content-between">
                            <div className="text-dark-gray">Waived Tax:</div>
                            <div className="font-medium text-green-600">-${waivedTaxAmount}</div>
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
                        <div className="font-medium ">${gradTotal}</div>
                    </div>
                    {/* <div className="flex justify-content-between bg-white py-2 px-3 border-round-md text-lg my-2 ">
                        <div className="text-dark-gray">Pre-Pay Balance</div>
                        <div className="font-medium text-green-600">$2.00</div>
                    </div>
                    <div className="flex justify-content-between bg-white py-2 px-3 border-round-md text-lg my-2  ">
                        <div className="text-dark-gray">Apply Promocode</div>
                        <div className="font-medium text-green-600">$2.00</div>
                    </div> */}
                </>
            ) : (
                <Lottie animationData={emptyCartAnimation} loop={true} />
            )}

            <div className="flex gap-2 mt-2">
                <PrimaryButton label="Checkout" className="w-full" />
                <CustomButton label="Save" severity="secondary" className="w-full" />
            </div>
            <div className="flex gap-2 mt-2">
                <CustomButton className="w-full px-2" label="No Sale" severity="secondary" />
                <PrimaryButton className="w-full px-1" label="Quick Cash" />
                <PrimaryButton className="w-full px-2" label="Pre-Pay" />
                <PrimaryButton className="w-full px-1" label="Card File" />
            </div>
        </div>
    );
}
