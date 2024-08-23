import React, { useEffect } from 'react';
import CustomAccordion from '../../shared/Accordion/Accordion';
import Cart from './Cart';
import { calculateDiscount, calculateTax, calculateUnitPrice } from './CartCal';
import PrimaryButton, { CustomButton, CustomButtonGroup } from '../../shared/Button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscountTypes } from '../../redux/actions/PosSettings/discountType';

const NewCart = ({ data, setData }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDiscountTypes());
    }, [dispatch]);

    let { allDiscountDropdown, allDiscountTypes } = useSelector((state) => state.discountType);

    const updateQuantity = (itemId, quantity) => {
        if (quantity === 0) {
            setData((prev) => ({
                ...prev,
                cartItems: data.cartItems.filter((cartItem) => (cartItem?.subVariation?.id ? cartItem?.subVariation?.id !== itemId : cartItem._id !== itemId)),
            }));
        } else {
            setData((prev) => ({
                ...prev,
                cartItems: data.cartItems.map((cartItem) =>
                    cartItem._id === itemId || cartItem?.subVariation?.id === itemId ? { ...cartItem, quantity } : cartItem,
                ),
            }));
        }
    };

    const removeItem = (itemId) => {
        setData((prev) => ({
            ...prev,
            cartItems: data?.cartItems.filter((cartItem) => cartItem._id !== itemId),
        }));
    };

    const netTotalDiscount = data?.cartItems.reduce((sum, item, index) => {
        const discountId = data?.cartDisTax?.[index]?.discount;
        const discount = calculateDiscount(item, discountId, allDiscountTypes);
        const totaldiscount = data?.cartDisTax?.[index]?.discount ? discount : 0;
        return (Number(sum) + totaldiscount).toFixed(4);
    }, 0);

    const netTotalTax = data?.cartItems.reduce((sum, item, index) => {
        const unitPrice = calculateUnitPrice(item);
        const taxValue = calculateTax(unitPrice, item?.totalTaxPercentage);
        const netTaxValue = taxValue * item?.quantity;
        const newTax = data?.cartDisTax?.[index]?.waiveTax ? 0 : netTaxValue;
        return (Number(sum) + newTax).toFixed(4);
    }, 0);

    const netTotal = data?.cartItems.reduce((sum, item) => {
        const unitPrice = calculateUnitPrice(item);
        const taxValue = calculateTax(unitPrice, item?.totalTaxPercentage);
        const netPrice = unitPrice * item.quantity - taxValue * item.quantity;
        return sum + netPrice;
    }, 0.0);

    const finalTotal = netTotal - Number(netTotalDiscount) + Number(netTotalTax);

    return (
        <>
            <CustomAccordion isActive={true} extraClassName="employee-accordion cart-table w-full" title={'Cart'}>
                <Cart
                    cartItems={data?.cartItems}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                    data={data}
                    setData={setData}
                    netTotal={netTotal}
                    allDiscountDropdown={allDiscountDropdown}
                />
            </CustomAccordion>
            <CustomAccordion isActive={true} extraClassName="employee-accordion w-full" title="Pricing Details">
                <h3 className="flex gap-2 border-top-1 text-sm align-items-center pt-2 border-gray-200 my-2">
                    Promo:{' '}
                    <span className="border-1 border-gray-200 border-round-lg p-2">
                        BOGO <i className="pi pi-times-circle"></i>
                    </span>
                </h3>
                <div className="mt-2">
                    <p className="flex justify-content-between mb-3">
                        <span className="font-semibold">Discounts</span>
                        <span className="text-green-700 font-semibold">${netTotalDiscount}</span>
                    </p>
                    <p className="flex justify-content-between mb-3">
                        <span className="font-semibold">Tax</span>
                        <span className="font-semibold">${netTotalTax}</span>
                    </p>
                    <p className="flex justify-content-between mb-3">
                        <span className="font-semibold">Final Total</span>
                        <span className="font-semibold">${finalTotal.toFixed(4)}</span>
                    </p>
                    <p className="flex justify-content-between mb-3">
                        <span className="font-semibold">Account Balance</span>
                        <span className="font-semibold text-red-600">$2.00</span>
                    </p>
                </div>
            </CustomAccordion>
            <CustomButtonGroup>
                <CustomButton label="Pay" className="mx-2" severity="success" outlined={false} />
                <PrimaryButton label="Save" />
            </CustomButtonGroup>
        </>
    );
};

export default NewCart;
