import React, { useEffect, useState } from 'react';
import CustomCard from '../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButton } from '../../../shared/Button/CustomButton';

import { useDispatch } from 'react-redux';
import { getDiscountTypes } from '../../../redux/actions/PosSettings/discountType';
import SelectDiscountPopup from './SelectDiscountPopup';
import SpecialDiscountPopup from './SpecialDiscountPopup';
import CartItem from './CartItem';
import CartDetails from './CartDetails';

export default function Cart({ cartItems, setSelectedItems, cartDetails, setAppliedPromo, appliedPromo }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDiscountTypes());
    }, [dispatch]);
    const [discountPopup, setDiscountPopup] = useState(false);
    const [specialDiscountPopup, setSpecialDiscountPopup] = useState(false);

    const onDeleteCartItem = (index) => {
        setSelectedItems((prev) => {
            let _arr = [...prev];
            _arr.splice(index, 1);
            return _arr;
        });
    };
    const onQtyChange = (index, qty) => {
        setSelectedItems((prev) => {
            let _prev = [...prev];
            _prev[index].quantity = qty;

            return _prev;
        });
    };
    const onWaiveTax = (index, condition) => {
        setSelectedItems((prev) => {
            let _arr = [...prev];
            let _obj = _arr[index];
            _obj.taxWaived = condition;
            _arr[index] = _obj;
            return _arr;
        });
    };
    const onOverrideDiscount = (index, item) => {
        setDiscountPopup({ index, item });
    };
    const onAddSpecialDiscount = (index, item) => {
        setSpecialDiscountPopup({ index, item });
    };
    const onApplyDiscount = (index, discount) => {
        setSelectedItems((prev) => {
            let _arr = [...prev];
            let _obj = _arr[index];
            _obj.defaultDiscount = discount;
            _arr[index] = _obj;
            return _arr;
        });
    };
    const onApplySpecialDiscount = (index, discount) => {
        setSelectedItems((prev) => {
            let _arr = [...prev];
            let _obj = _arr[index];
            _obj.specialDiscount = discount;
            _arr[index] = _obj;
            return _arr;
        });
    };
    const onRemoveSpecialDiscount = (index) => {
        setSelectedItems((prev) => {
            let _arr = [...prev];
            let _obj = _arr[index];
            _obj.specialDiscount = null;
            _arr[index] = _obj;
            return _arr;
        });
    };

    return (
        <>
            <SelectDiscountPopup visible={discountPopup} setVisible={setDiscountPopup} onApply={onApplyDiscount} />
            <SpecialDiscountPopup visible={specialDiscountPopup} setVisible={setSpecialDiscountPopup} onApply={onApplySpecialDiscount} />
            <CustomCard title="Cart" col={12}>
                {cartItems?.map((item, i) => (
                    <CartItem
                        key={item?._id}
                        index={i}
                        item={item}
                        onDeleteCartItem={onDeleteCartItem}
                        onQtyChange={onQtyChange}
                        onWaiveTax={onWaiveTax}
                        onOverrideDiscount={onOverrideDiscount}
                        onAddSpecialDiscount={onAddSpecialDiscount}
                        onRemoveSpecialDiscount={onRemoveSpecialDiscount}
                    />
                ))}
                <CartDetails cartDetails={cartDetails} setAppliedPromo={setAppliedPromo} appliedPromo={appliedPromo} />
            </CustomCard>
            <div className="flex gap-2 mt-2">
                <CustomButton className="w-full px-2" label="No Sale" severity="secondary" />
                <PrimaryButton className="w-full px-1" label="Quick Cash" />
                <PrimaryButton className="w-full px-2" label="Pre-Pay" />
                <PrimaryButton className="w-full px-1" label="Card File" />
            </div>
        </>
    );
}
