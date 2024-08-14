import React, { useState } from 'react';
import { CustomCheckbox, CustomDropDown } from '../../shared/Input/AllInputs';
import { calculateUnitPrice } from './CartCal';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useSelector } from 'react-redux';
import CustomOverlay from '../../shared/CustomOverlay';
const Cart = ({ cartItems, updateQuantity, removeItem, data, setData, netTotal }) => {
    console.log('cartItems>>', cartItems);
    const handleChange = ({ name, value, customIndex }) => {
        console.log(name, value, customIndex);
        setData((prev) => {
            const updatedCartDisTax = [...prev.cartDisTax];
            updatedCartDisTax[customIndex] = { ...updatedCartDisTax[customIndex], [name]: value };

            return { ...prev, cartDisTax: updatedCartDisTax };
        });
    };

    const [discountOpen, setDiscountOpen] = useState(false);
    const actionTemplate = (col, index) => {
        return (
            <CustomOverlay>
                <ul className="no-style p-0">
                    <li className="flex  text-xs font-medium mb-3 cursor-pointer">
                        <CustomCheckbox
                            col={12}
                            label="Waive Tax"
                            name="waiveTax"
                            value={data?.cartDisTax?.[index.rowIndex]?.waiveTax || false}
                            onChange={handleChange}
                            customIndex={index.rowIndex}
                        />
                    </li>
                    <hr />
                    <li className="flex gap-2 text-xs mt-2 font-medium mb-3 cursor-pointer justify-content-center " onClick={() => setDiscountOpen(col._id)}>
                        Discount
                    </li>
                    <hr />
                    <li
                        className="flex gap-2 text-xs font-medium mb-3 mt-2 cursor-pointer text-center align-items-center justify-content-center "
                        onClick={() => removeItem(col._id)}
                    >
                        <h4 className="text-center">Remove</h4>
                    </li>
                </ul>
            </CustomOverlay>
        );
    };

    const unitPriceTemplate = (r) => {
        const unitPrice = calculateUnitPrice(r);
        return unitPrice;
    };

    const quantityTemplate = (item) => {
        return (
            <div className="flex gap-2 align-items-center">
                <i className="pi pi-minus-circle text-red-600" onClick={() => updateQuantity(item._id, item.quantity - 1)}></i>
                {item.quantity}
                <i className="pi pi-plus-circle text-green-600" onClick={() => updateQuantity(item._id, item.quantity + 1)}></i>
            </div>
        );
    };
    console.log('data>>', data);

    const TaxTemplate = (r, row) => {
        console.log(r, row);
        return (
            <div className="flex justify-content-start mt-2">
                <CustomCheckbox
                    col={6}
                    label="Waive Tax"
                    name="waiveTax"
                    value={data?.cartDisTax?.[row.rowIndex]?.waiveTax || false}
                    onChange={handleChange}
                    customIndex={row.rowIndex}
                />
            </div>
        );
    };

    const discountOptions = [];
    let { allDiscountDropdown, allDiscountTypes } = useSelector((state) => state.discountType);

    console.log(allDiscountDropdown);

    const discountTemplate = (r, row) => {
        console.log(r, 'row');
        return (
            <div className="flex justify-content-start mt-2">
                <CustomDropDown
                    col={12}
                    label="Discount"
                    name="discount"
                    value={data?.cartDisTax?.[row.rowIndex]?.discount}
                    onChange={handleChange}
                    customIndex={row.rowIndex}
                    options={allDiscountDropdown}
                />
            </div>
        );
    };

    const onRowEditComplete = (e) => {};
    return (
        <>
            <DataTable value={cartItems} size="normal" tableStyle={{ minWidth: '25rem' }} className="p-0" stripedRows scrollable scrollHeight="400px">
                <Column field="name" header="Item" style={{ width: '40%' }}></Column>
                <Column field="unitPrice" body={unitPriceTemplate} header="Price" style={{ width: '20%' }}></Column>
                <Column field="quantity" header="Qty" body={quantityTemplate} style={{ width: '20%' }}></Column>

                <Column body={actionTemplate} style={{ width: '20%' }}></Column>
            </DataTable>
            {/* <div className="mt-2">
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
            </div> */}
        </>
    );
};

export default Cart;
