import React, { useState } from 'react';
import { CustomCheckbox, CustomDropDown } from '../../shared/Input/AllInputs';
import { calculateUnitPrice } from './CartCal';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useSelector } from 'react-redux';
import CustomOverlay from '../../shared/CustomOverlay';
import { confirmDelete } from '../../utils/commonFunctions';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import { Tooltip } from 'primereact/tooltip';
const Cart = ({ cartItems, updateQuantity, removeItem, data, setData, netTotal, allDiscountDropdown }) => {
    // const handleChange = ({ name, value, customIndex }) => {
    //     console.log(name, value, customIndex);
    //     setData((prev) => {
    //         const updatedCartDisTax = [...prev.cartDisTax];
    //         updatedCartDisTax[customIndex] = { ...updatedCartDisTax[customIndex], [name]: value };

    //         return { ...prev, cartDisTax: updatedCartDisTax };
    //     });
    // };
    const handleChange = ({ name, value, customIndex }) => {
        setTempData((prev) => ({
            ...prev,
            [customIndex]: {
                ...prev[customIndex],
                [name]: value,
            },
        }));
    };

    const handleTax = (index) => {
        confirmDelete(
            () => {
                setData((prev) => {
                    const updatedCartDisTax = [...prev.cartDisTax];
                    const currentTax = updatedCartDisTax?.[index]?.waiveTax;
                    updatedCartDisTax[index] = {
                        ...updatedCartDisTax[index],
                        waiveTax: !currentTax,
                    };
                    return { ...prev, cartDisTax: updatedCartDisTax };
                });
            },
            `Do you want to ${data?.cartDisTax?.[index]?.waiveTax ? 'Apply' : 'Waive'} Tax?`,
            'center',
        );
    };

    const [discountOpen, setDiscountOpen] = useState(null);
    const [tempData, setTempData] = useState(null);

    const handleDiscountOpen = (col, rowIndex) => {
        if (col?.overRideDiscount === 'true' || col?.defaultDiscount === null) {
            setTempData((prev) => ({
                ...prev,
                [rowIndex]: data?.cartDisTax?.[rowIndex], // Initialize tempData for the specific row
            }));
            setDiscountOpen({ id: col._id, rowIndex });
        }
    };

    const actionTemplate = (col, index) => {
        let id = col?.subVariation?.id ? col?.subVariation?.id : col?._id;
        return (
            <CustomOverlay>
                <ul className="list-none p-0">
                    <li className="flex  text-xs font-medium mb-3 cursor-pointer justify-content-center" onClick={() => handleTax(index.rowIndex)}>
                        {data?.cartDisTax?.[index.rowIndex]?.waiveTax ? 'ApplyTax' : 'WaiveTax'}
                    </li>
                    <hr />
                    <li
                        className={`"flex  text-xs mt-2 font-medium mb-3 cursor-pointer justify-content-center ${col?.overRideDiscount === 'false' && col?.defaultDiscount ? 'custom-discount' : ''} "`}
                        onClick={() => handleDiscountOpen(col, index.rowIndex)}
                    >
                        <Tooltip target=".custom-discount" content="Not Applicable" position="bottom" showDelay="400" />
                        {col?.defaultDiscount ? 'Override Discount' : 'Apply Discount'}
                    </li>
                    <hr />
                    <li
                        className="flex gap-2 text-xs font-medium mb-3 mt-2 cursor-pointer text-center align-items-center justify-content-center "
                        onClick={() => removeItem(id)}
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
        let minimumQuantity = item?.subVariation?.minimumQuantity ? item?.subVariation?.minimumQuantity : item.minimumQuantity;
        let maximumQuantity = item?.subVariation?.maximumQuantity ? item?.subVariation?.maximumQuantity : item.maximumQuantity;
        let id = item?.subVariation?.id ? item?.subVariation?.id : item?._id;

        return (
            <div className="flex gap-2 align-items-center">
                <i
                    className={`pi pi-minus-circle ${item.quantity > minimumQuantity ? 'text-red-600' : 'text-gray-400'}`}
                    onClick={() => (item.quantity > minimumQuantity ? updateQuantity(id, item.quantity - 1) : null)}
                ></i>
                {item.quantity}
                <i
                    className={`pi pi-plus-circle ${item.quantity < maximumQuantity ? 'text-green-600' : 'text-gray-400'}`}
                    onClick={() => (item.quantity < maximumQuantity ? updateQuantity(id, item.quantity + 1) : null)}
                ></i>
            </div>
        );
    };

    const discountOptions = [];

    const onClose = () => {
        setTempData((prev) => {
            const updatedTempData = { ...prev };
            delete updatedTempData[discountOpen.rowIndex];
            return updatedTempData;
        });
        setDiscountOpen(null);
    };
    const handleSave = () => {
        setData((prev) => {
            const updatedCartDisTax = [...prev.cartDisTax];
            updatedCartDisTax[discountOpen.rowIndex] = tempData[discountOpen.rowIndex];

            return { ...prev, cartDisTax: updatedCartDisTax };
        });

        setTempData((prev) => {
            const updatedTempData = { ...prev };
            delete updatedTempData[discountOpen.rowIndex];
            return updatedTempData;
        });
        onClose();
    };

    const nameTemplate = (r) => {
        return (
            <>
                {r.name} {r?.variation?.name ? `(${r?.variation?.name})` : null} {r?.subVariation?.name ? `(${r?.subVariation?.name})` : null}
            </>
        );
    };

    return (
        <>
            <DataTable value={cartItems} size="normal" tableStyle={{ minWidth: '25rem' }} className="p-0" stripedRows scrollable scrollHeight="400px">
                <Column field="name" body={nameTemplate} header="Item" style={{ width: '40%' }}></Column>
                <Column field="unitPrice" body={unitPriceTemplate} header="Price" style={{ width: '20%' }}></Column>
                <Column field="quantity" header="Qty" body={quantityTemplate} style={{ width: '20%' }}></Column>

                <Column body={actionTemplate} style={{ width: '20%' }}></Column>
            </DataTable>
            <h4 className="flex border-top-1 pt-2 border-gray-200 justify-content-between mx-3">
                Net Total: <span>${netTotal.toFixed(4)}</span>
            </h4>
            <CustomDialog title="Discount" visible={discountOpen !== null} onCancel={onClose} loading={false} onSave={handleSave}>
                <CustomDropDown
                    col={12}
                    label="Discount"
                    name="discount"
                    value={tempData?.[discountOpen?.rowIndex]?.discount}
                    onChange={handleChange}
                    customIndex={discountOpen?.rowIndex}
                    options={allDiscountDropdown}
                />
            </CustomDialog>
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
