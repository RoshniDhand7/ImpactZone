import React from 'react';
import { CustomCheckbox } from '../../shared/Input/AllInputs';
import { calculateUnitPrice } from './CartCal';
const Cart = ({ cartItems, updateQuantity, removeItem, data, setData, netTotal }) => {
    const handleChange = ({ name, value, customIndex }) => {
        setData((prev) => {
            const updatedCartDisTax = [...prev.cartDisTax];
            updatedCartDisTax[customIndex] = { ...updatedCartDisTax[customIndex], [name]: value };

            return { ...prev, cartDisTax: updatedCartDisTax };
        });
    };
    return (
        <div>
            {cartItems.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <>
                    {cartItems.map((item, index) => {
                        const unitPrice = calculateUnitPrice(item);

                        console.log(unitPrice);
                        return (
                            <div className="cart-box border-top-1 border-gray-300 py-2" key={index}>
                                <div className="flex gap-3 justify-content-between mb-2">
                                    <p className="text-sm flex gap-2 font-bold align-items-center">
                                        <i className="pi pi-trash text-xs text-red-600" onClick={() => removeItem(item._id)}></i>
                                        {item.name}
                                    </p>
                                    <span className="font-bold">${unitPrice}</span>
                                    <div className="flex gap-2 align-items-center">
                                        <i className="pi pi-minus-circle text-red-600" onClick={() => updateQuantity(item._id, item.quantity - 1)}></i>
                                        {item.quantity}
                                        <i className="pi pi-plus-circle text-green-600" onClick={() => updateQuantity(item._id, item.quantity + 1)}></i>
                                    </div>
                                </div>
                                <div className="flex justify-content-start mt-2">
                                    <CustomCheckbox
                                        col={4}
                                        label="Waive Tax"
                                        name="waiveTax"
                                        value={data?.cartDisTax?.[index]?.waiveTax || false}
                                        onChange={handleChange}
                                        customIndex={index}
                                    />
                                    <CustomCheckbox
                                        col={4}
                                        label="Discount"
                                        name="discount"
                                        value={data?.cartDisTax?.[index]?.discount || false}
                                        onChange={handleChange}
                                        customIndex={index}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
            <h3 className="flex border-top-1 pt-2 border-gray-200 justify-content-between">
                Net Total: <span>${netTotal.toFixed(4)}</span>
            </h3>
        </div>
    );
};

export default Cart;
