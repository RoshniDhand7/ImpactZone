import { confirmPopup } from 'primereact/confirmpopup';
import React from 'react';

export default function CartItem(props) {
    const { onDeleteCartItem, onWaiveTax, onQtyChange, onOverrideDiscount, onAddSpecialDiscount, onRemoveSpecialDiscount } = props;
    const { item, index } = props;
    const { itemCaption, name, taxWaived } = item;
    const { allowDiscount, defaultDiscount, overrideDiscount, specialDiscount, promoDiscount } = item;
    const { waivedTaxAmount, netPrice, finalNetPrice, finalTotal } = item;
    const { minimumQuantity, maximumQuantity, quantity, allowUnlimited } = item;

    console.log('promoDiscountpromoDiscount=>', promoDiscount);

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
                    {allowDiscount && promoDiscount && (
                        <div className="bg-green-100 text-green-900 border-round-sm px-1 ml-2 my-auto">
                            Promo {promoDiscount?.amountType === 'PERCENTAGE' && `${promoDiscount?.amount}% OFF`}
                            {promoDiscount?.amountType === 'FIXED' && `$${promoDiscount?.amount} OFF`}
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
