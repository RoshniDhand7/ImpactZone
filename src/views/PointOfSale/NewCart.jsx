import React, { useEffect, useMemo } from 'react';
import CustomAccordion from '../../shared/Accordion/Accordion';
import Cart from './Cart';
import { calculateCommission, calculateDiscount, calculatePromoCodeDiscount, calculateTax, calculateTax1, calculateUnitPrice } from './CartCal';
import PrimaryButton, { CustomButton, CustomButtonGroup } from '../../shared/Button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscountTypes } from '../../redux/actions/PosSettings/discountType';
import { CustomChipInput } from '../../shared/Input/AllInputs';
import { clearPOSPromo, getPromoCodeDetail } from '../../redux/actions/POS/PosActions';
import _ from 'lodash';

const NewCart = ({ data, setData, handleChange }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDiscountTypes());
    }, [dispatch]);

    useEffect(() => {
        if (data?.promoCode?.length > 0) {
            dispatch(getPromoCodeDetail(_, data?.promoCode));
        } else {
            dispatch(clearPOSPromo());
        }
    }, [dispatch, data?.promoCode]);

    let { allDiscountDropdown, allDiscountTypes } = useSelector((state) => state.discountType);
    let { allPOSPromo } = useSelector((state) => state?.PointOfSale);

    const netCommission =
        Object.keys(allPOSPromo)?.length > 0
            ? data?.cartItems.reduce((sum, item) => {
                  const unitPrice = calculateUnitPrice(item);
                  const taxValue = calculateTax(unitPrice, item?.totalTaxPercentage);
                  const netPrice = unitPrice * item.quantity - taxValue * item.quantity;
                  let cmgp = allPOSPromo?.salesCodes?.employee?.salesCommission?.find((item1) => item1.commissionGroup === item.commissionGroup);
                  let dn = cmgp ? calculateCommission(cmgp?.amountType, cmgp?.pay, netPrice, item.quantity, cmgp?.commissionType) : 0;
                  return sum + dn;
              }, 0.0)
            : 0;

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
                    cartItem?.subVariation?.id
                        ? cartItem?.subVariation?.id === itemId
                            ? { ...cartItem, quantity }
                            : cartItem
                        : cartItem._id === itemId
                          ? { ...cartItem, quantity }
                          : cartItem,
                ),
            }));
        }
    };

    const removeItem = (itemId) => {
        setData((prev) => ({
            ...prev,
            cartItems: data?.cartItems.filter((cartItem) =>
                cartItem?.subVariation?.id
                    ? cartItem?.subVariation?.id !== itemId
                    : cartItem?.type === 'subVariation'
                      ? cartItem.id !== itemId
                      : cartItem._id !== itemId,
            ),
        }));
    };

    const netTotal = data?.cartItems.reduce((sum, item) => {
        const unitPrice = calculateUnitPrice(item);
        const netUnitPrice = unitPrice * item.quantity;
        const taxValue = calculateTax1(unitPrice, item.totalTaxPercentage);
        const netPrice1 = (unitPrice - taxValue) * item.quantity;
        const discount = calculateDiscount(item, allDiscountTypes);
        const totalDiscountedPrice = netPrice1 - discount < 0 ? 0 : netPrice1 - discount;
        const tax = calculateTax(item, totalDiscountedPrice);

        const netPrice = totalDiscountedPrice + tax;
        return sum + netPrice1;
    }, 0.0);

    const netTotalDiscount = useMemo(() => {
        return data?.cartItems
            .reduce((sum, item) => {
                const discount = calculateDiscount(item, allDiscountTypes);

                const totalDiscount = item?.discount ? discount : 0;
                const promoCodeDiscount =
                    (allPOSPromo && allPOSPromo?.discountApply) || allPOSPromo?.applyDiscountAndCommission
                        ? calculatePromoCodeDiscount(allPOSPromo, netTotal)
                        : 0;
                return Number(sum) + totalDiscount + promoCodeDiscount;
            }, 0)
            .toFixed(4);
    }, [data?.cartItems, allPOSPromo, allDiscountTypes, netTotal]);

    const netTotalTax = useMemo(() => {
        return data?.cartItems
            .reduce((sum, item) => {
                const discount = calculateDiscount(item, allDiscountTypes);
                const taxValue = calculateTax(item, discount);
                const newTax = item?.waiveTax || (item?.subVariation?.id && !item?.subVariation?.taxable) ? 0 : taxValue;
                return Number(sum) + newTax;
            }, 0)
            .toFixed(4);
    }, [data?.cartItems, allDiscountTypes]);

    const finalTotal = netTotal + Number(netTotalTax);

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
                    allDiscountDropdown={allDiscountTypes}
                />
            </CustomAccordion>
            <CustomAccordion isActive={true} extraClassName="employee-accordion w-full" title="Pricing Details">
                <CustomChipInput
                    name="promoCode"
                    max={1}
                    data={data}
                    onChange={handleChange}
                    placeholder={data?.promoCode?.length > 0 ? '' : 'Please enter to add value'}
                />

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
                        <span className="font-semibold">Net Commission</span>
                        <span className="font-semibold">${netCommission ?? 0}</span>
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
