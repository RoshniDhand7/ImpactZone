import React, { useEffect, useMemo, useRef, useState } from 'react';
import CustomAccordion from '../../shared/Accordion/Accordion';
import Cart from './Cart';
import { calculateCommission, calculateDiscount, calculatePromoCodeDiscount, calculateTax, calculateTax1, calculateUnitPrice } from './CartCal';
import PrimaryButton, { CustomButton, LightButton } from '../../shared/Button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscountTypes } from '../../redux/actions/PosSettings/discountType';
import { CustomChipInput, CustomInput } from '../../shared/Input/AllInputs';
import { clearPOSPromo, getPromoCodeDetail, verifyCashRegisterAccessCode } from '../../redux/actions/POS/PosActions';
import _ from 'lodash';
import { CustomMenu } from '../../shared/CustomMenu';
import useRegister from '../../hooks/useRegister';
import CustomDialog from '../../shared/Overlays/CustomDialog';
import { CustomGridLayout } from '../../shared/Cards/CustomCard';

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

    let { allDiscountTypes } = useSelector((state) => state.discountType);
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
        // const netUnitPrice = unitPrice * item.quantity;
        const taxValue = calculateTax1(unitPrice, item.totalTaxPercentage);
        const netPrice1 = (unitPrice - taxValue) * item.quantity;
        // const discount = calculateDiscount(item, allDiscountTypes);
        // const totalDiscountedPrice = netPrice1 - discount < 0 ? 0 : netPrice1 - discount;
        // const tax = calculateTax(item, totalDiscountedPrice);

        // const netPrice = totalDiscountedPrice + tax;
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

    const menuref = useRef();
    let { allRegisters } = useRegister();

    allRegisters = allRegisters?.map((item) => ({ label: item.name, command: () => setVisible(item._id) }));
    const items = allRegisters;
    const [visible, setVisible] = useState(null);

    const onClose = () => {
        setVisible(null);
        setData((prev) => ({ ...prev, accessCode: '' }));
    };
    const handleSave = () => {
        dispatch(
            verifyCashRegisterAccessCode(data?.accessCode, () => {
                setVisible(null);
            }),
        );
    };

    return (
        <>
            <CustomDialog title="Access Code" visible={visible} onCancel={onClose} loading={false} onSave={handleSave} saveLabel="Check In">
                <CustomGridLayout>
                    <CustomInput col="12" name="accessCode" data={data} onChange={handleChange} />
                </CustomGridLayout>
            </CustomDialog>
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
            <CustomMenu items={items} refid="popup_menu_left" ref={menuref} />
            <div className="flex gap-3 flex-wrap">
                <PrimaryButton label="Add/Drop" className="product-checkout-btn p-3 " />
                <LightButton label="Reciepts" className="product-checkout-btn p-3" />
                <PrimaryButton label="Drawer Summary" className="product-checkout-btn p-3" />
                <LightButton
                    label="Open Register"
                    className="product-checkout-btn p-3"
                    onClick={(event) => menuref.current.toggle(event)}
                    aria-controls="popup_menu_left"
                    disabled={data?.accessCode ? true : false}
                />
                <PrimaryButton label="No Sale" className="product-checkout-btn p-3" />
                <LightButton label="Quick Cash" className="product-checkout-btn p-3" />
                <PrimaryButton label="Pre-pay" className="product-checkout-btn p-3" />
                <LightButton label="Card on File" className="product-checkout-btn p-3" />
                <CustomButton label="Pay" className="w-5 p-4" severity="success" outlined={false} />
                <PrimaryButton label="Save" className="w-5 p-4" />
            </div>
        </>
    );
};

export default NewCart;
