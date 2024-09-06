import React, { useState } from 'react';
import { CustomDropDown } from '../../shared/Input/AllInputs';
import { calculateUnitPrice } from './CartCal';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import CustomOverlay from '../../shared/CustomOverlay';
import { confirmDelete } from '../../utils/commonFunctions';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import { Tooltip } from 'primereact/tooltip';
const Cart = ({ cartItems, updateQuantity, removeItem, data, setData, netTotal, allDiscountDropdown }) => {
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
                    const updatedCartDisTax = [...prev.cartItems];
                    const currentTax = updatedCartDisTax?.[index]?.waiveTax;
                    updatedCartDisTax[index] = {
                        ...updatedCartDisTax[index],
                        waiveTax: !currentTax,
                    };
                    return { ...prev, cartItems: updatedCartDisTax };
                });
            },
            `Do you want to ${data?.cartItems?.[index]?.waiveTax ? 'Apply' : 'Waive'} Tax?`,
            'center',
        );
    };

    const [discountOpen, setDiscountOpen] = useState(null);
    const [tempData, setTempData] = useState(null);

    const handleDiscountOpen = (col, rowIndex) => {
        if (col?.overRideDiscount || col?.defaultDiscount === null) {
            setTempData((prev) => ({
                ...prev,
                [rowIndex]: data?.cartItems?.[rowIndex],
            }));
            setDiscountOpen({ id: col._id, rowIndex });
        }
    };

    const actionTemplate = (col, index) => {
        let id = col?.subVariation?.id ? col?.subVariation?.id : col?.type === 'subVariation' ? col?.id : col?._id;
        return (
            <CustomOverlay>
                <ul className="list-none p-0">
                    <li className="flex  text-xs font-medium mb-3 cursor-pointer justify-content-center" onClick={() => handleTax(index.rowIndex)}>
                        {data?.cartItems?.[index.rowIndex]?.waiveTax ? 'ApplyTax' : 'WaiveTax'}
                    </li>
                    <hr />
                    <li
                        className={`"flex  text-xs mt-2 font-medium mb-3 cursor-pointer justify-content-center ${!col?.overRideDiscount && col?.defaultDiscount ? 'custom-discount' : ''} "`}
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

    const onClose = () => {
        setTempData((prev) => {
            const updatedTempData = { ...prev };
            delete updatedTempData[discountOpen.rowIndex];
            return updatedTempData;
        });
        setDiscountOpen(null);
    };
    // const handleSave = () => {
    //     setData((prev) => {
    //         const updatedCartDisTax = [...prev.cartItems];
    //         updatedCartDisTax[discountOpen.rowIndex] = tempData[discountOpen.rowIndex];

    //         return { ...prev, cartItems: updatedCartDisTax };
    //     });

    //     setTempData((prev) => {
    //         const updatedTempData = { ...prev };
    //         delete updatedTempData[discountOpen.rowIndex];
    //         return updatedTempData;
    //     });
    //     onClose();
    // };
    const handleSave = () => {
        setData((prev) => {
            const updatedCartDisTax = [...prev.cartItems];

            // Add discount information to the cart item
            const updatedItem = {
                ...tempData[discountOpen.rowIndex], // existing item data
                discount: tempData[discountOpen.rowIndex].discount || {}, // assuming discount is in tempData
            };

            updatedCartDisTax[discountOpen.rowIndex] = updatedItem;

            return { ...prev, cartItems: updatedCartDisTax };
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
                    options={allDiscountDropdown?.map((item) => {
                        return { name: item.discountName, value: item };
                    })}
                />
            </CustomDialog>
        </>
    );
};

export default Cart;
