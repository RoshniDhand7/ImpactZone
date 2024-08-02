import React from 'react';
import { CustomCheckbox } from '../../shared/Input/AllInputs';
const Cart = ({ cartItems, updateQuantity, removeItem }) => {
    const total = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    return (
        <div>
            {cartItems.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    {cartItems.map((item, index) => (
                        <div className="cart-box border-top-1 border-gray-300 py-2" key={index}>
                            <div className="flex gap-3 justify-content-between mb-2">
                                <p className="text-sm flex gap-2 font-bold align-items-center">
                                    <i className="pi pi-trash text-xs text-red-600" onClick={() => removeItem(item?._id)}></i>
                                    {item.name}
                                </p>
                                <span className="font-bold">${item.unitPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex gap-3 justify-content-between align-items-center">
                                <span className="font-normal">Quantity</span>
                                <div className="flex gap-2 align-items-center">
                                    <i className="pi pi-plus-circle text-green-600" onClick={() => updateQuantity(item?._id, item.quantity + 1)}></i>
                                    {item.quantity}
                                    <i className="pi pi-minus-circle text-red-600" onClick={() => updateQuantity(item?._id, item.quantity - 1)}></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
            <h3 className="flex border-top-1 pt-2 border-gray-200 justify-content-between">
                Total: <span>${total.toFixed(2)}</span>
            </h3>
            <div className="flex justify-content-between">
                <CustomCheckbox col={4} label="Waive Tax" />
                <CustomCheckbox col={4} label="Discount" />
                <CustomCheckbox col={4} label="Waive Tax" />
            </div>
            <h3 className="flex gap-2 border-top-1 text-sm align-items-center pt-2 border-gray-200">
                Promo:{' '}
                <span className="border-1 border-gray-200 border-round-lg p-2">
                    BOGO <i className="pi pi-times-circle"></i>
                </span>
            </h3>
            <div className="">
                <p className="flex justify-content-between mb-2">
                    <span>Discounts</span>
                    <span>$2.00</span>
                </p>
                <p className="flex justify-content-between mb-2">
                    <span>Tax</span>
                    <span>$2.00</span>
                </p>
                <p className="flex justify-content-between mb-2">
                    <span>Discounts</span>
                    <span>$2.00</span>
                </p>
                <p className="flex justify-content-between mb-2">
                    <span>Discounts</span>
                    <span>$2.00</span>
                </p>
            </div>
        </div>
    );
};

export default Cart;
