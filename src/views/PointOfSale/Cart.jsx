import React from 'react';
import { CustomCheckbox } from '../../shared/Input/AllInputs';
const Cart = ({ cartItems, updateQuantity, removeItem }) => {
    const calculateUnitPrice = (item) => {
        console.log('item,', item);
        if (item.quantity > item.moreThan1 && item.quantity <= item.moreThan2) {
            console.log('unitPrice1', item.quantity, item.morethan1, item.morethan2);
            return item.unitPrice1.toFixed(4);
        } else if (item.quantity > item.moreThan2 && item.quantity <= item.moreThan3) {
            console.log('unitPrice2');
            return item.unitPrice2.toFixed(4);
        } else if (item.quantity > item.moreThan3) {
            console.log('unitPrice3');
            return item.unitPrice3.toFixed(4);
        } else {
            console.log('unitPrice4', item.quantity, item.moreThan1, item.moreThan2);
            return item.unitPrice.toFixed(4);
        }
    };
    const total = cartItems.reduce((sum, item) => {
        const unitPrice = calculateUnitPrice(item);
        console.log(`Item ID: ${item._id}, Quantity: ${item.quantity}, Unit Price: ${sum + unitPrice}`);
        return sum + unitPrice * item.quantity;
    }, 0.0);
    // const total = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    return (
        <div>
            {cartItems.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    {cartItems.map((item, index) => {
                        const unitPrice = calculateUnitPrice(item);

                        {
                            console.log(unitPrice, 'unitPrice12');
                        }

                        

                        return (
                            <div className="cart-box border-top-1 border-gray-300 py-2" key={index}>
                                <div className="flex gap-3 justify-content-between mb-2">
                                    <p className="text-sm flex gap-2 font-bold align-items-center">
                                        <i className="pi pi-trash text-xs text-red-600" onClick={() => removeItem(item._id)}></i>
                                        {item.name}
                                    </p>
                                    <span className="font-bold">${unitPrice}</span>
                                </div>
                                <div className="flex gap-3 justify-content-between align-items-center">
                                    <span className="font-normal">Quantity</span>
                                    <div className="flex gap-2 align-items-center">
                                        <i className="pi pi-plus-circle text-green-600" onClick={() => updateQuantity(item._id, item.quantity + 1)}></i>
                                        {item.quantity}
                                        <i className="pi pi-minus-circle text-red-600" onClick={() => updateQuantity(item._id, item.quantity - 1)}></i>
                                    </div>
                                </div>
                                <div className="flex justify-content-start mt-2">
                                    <CustomCheckbox col={4} label="Waive Tax" />
                                    <CustomCheckbox col={4} label="Discount" />
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
            <h3 className="flex border-top-1 pt-2 border-gray-200 justify-content-between">
                Total: <span>${total.toFixed(2)}</span>
            </h3>
        </div>
    );
};

export default Cart;
