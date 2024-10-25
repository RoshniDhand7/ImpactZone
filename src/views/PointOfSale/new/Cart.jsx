import React, { useEffect, useRef, useState } from 'react';
import { Menu } from 'primereact/menu';
import CustomCard from '../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButton } from '../../../shared/Button/CustomButton';

import { useDispatch } from 'react-redux';
import { getDiscountTypes } from '../../../redux/actions/PosSettings/discountType';
import SelectDiscountPopup from './SelectDiscountPopup';
import SpecialDiscountPopup from './SpecialDiscountPopup';
import CartItem from './CartItem';
import CartDetails from './CartDetails';
import OpenDrawerModel from './Drawer/OpenDrawerModel';
import CloseDraweModel from './Drawer/CloseDraweModel';
import { useHistory } from 'react-router-dom';

export default function Cart({ cartItems, setSelectedItems, cartDetails, setAppliedPromo, appliedPromo, onOpenSaveCartPopup }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const menu = useRef(null);
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

    const [openDrawer, setOpenDrawer] = useState(false);
    const [closeDrawer, setCloseDrawer] = useState(false);

    let items = [
        { label: 'Add/Drop' },
        { label: 'Receipts' },
        { label: 'Drawer Summary', command: () => history.push('/more/pos/drawer-summary') },
        { label: 'Open Register', command: () => setOpenDrawer(true) },
        { label: 'Close Register', command: () => setCloseDrawer(true) },
        { label: 'Saved Carts', command: () => history.push('/more/pos/saved-carts') },
    ];

    return (
        <>
            <OpenDrawerModel visible={openDrawer} setVisible={setOpenDrawer} />
            <CloseDraweModel visible={closeDrawer} setVisible={setCloseDrawer} />
            <Menu model={items} popup ref={menu} />
            <SelectDiscountPopup visible={discountPopup} setVisible={setDiscountPopup} onApply={onApplyDiscount} />
            <SpecialDiscountPopup visible={specialDiscountPopup} setVisible={setSpecialDiscountPopup} onApply={onApplySpecialDiscount} />
            <CustomCard title="Cart" col={12} name="More Options" onClick={(event) => menu.current.toggle(event)}>
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
                <CartDetails
                    cartDetails={cartDetails}
                    setAppliedPromo={setAppliedPromo}
                    appliedPromo={appliedPromo}
                    onOpenSaveCartPopup={onOpenSaveCartPopup}
                />
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
