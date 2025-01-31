import React, { useEffect, useRef, useState } from 'react';
import { Menu } from 'primereact/menu';
import CustomCard from '../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButton } from '../../../shared/Button/CustomButton';

import { useDispatch, useSelector } from 'react-redux';
import { getDiscountTypes } from '../../../redux/actions/PosSettings/discountType';
import SelectDiscountPopup from './SelectDiscountPopup';
import SpecialDiscountPopup from './SpecialDiscountPopup';
import CartItem from './CartItem';
import CartDetails from './CartDetails';
import OpenDrawerModel from './Drawer/OpenDrawerModel';
import CloseDraweModel from './Drawer/CloseDraweModel';
import { useHistory } from 'react-router-dom';

import emptyCartAnimation from '../../../assets/lottie/emptyCart.json';
import Lottie from 'lottie-react';
import DrawerSelector from './Drawer/DrawerSelector';
import CustomAnimatedCard from '../../../shared/Transitions/CustomAnimatedCard';
import AddDropPopup from './AddDropPopup';
import NoSalePopup from './NoSalePopup';
import QuickCashPopup from './QuickCashPopup';
import { showToast } from '../../../redux/actions/toastAction';

export default function Cart({
    cartItems,
    setSelectedItems,
    cartDetails,
    setAppliedPromo,
    appliedPromo,
    onOpenSaveCartPopup,
    onOpenCheckout,
    ifCartValidated,
    onCheckout,
    memberDetail,
    loading,
    loading1,
    setLoading,
    setLoading1,
    additionalPrePay,
    setAdditionalPrePay,
}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const drawer = useSelector((state) => state.pos.drawer);
    const menu = useRef(null);
    useEffect(() => {
        dispatch(getDiscountTypes());
    }, [dispatch]);
    const [discountPopup, setDiscountPopup] = useState(false);
    const [specialDiscountPopup, setSpecialDiscountPopup] = useState(false);
    let { gradTotal } = cartDetails;

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

    const [openQuickCash, setOpenQuickCash] = useState(false);
    const [openNoSale, setOpenNoSale] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [closeDrawer, setCloseDrawer] = useState(false);
    const [openAddDrop, setOpenAddDrop] = useState(false);
    const [showPrePay, setShowPrePay] = useState(false);

    let items = [
        { label: 'Add/Drop', command: () => setOpenAddDrop(true) },
        { label: 'Receipts', command: () => history.push('/more/pos/receipts') },
        { label: 'Drawer Summary', command: () => history.push('/more/pos/drawers') },
        { label: 'Open Register', command: () => setOpenDrawer(true) },
        { label: 'Close Register', command: () => setCloseDrawer(true) },
        { label: 'Saved Carts', command: () => history.push('/more/pos/saved-carts') },
    ];

    const headers = <DrawerSelector />;
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        setHeight(ref?.current?.clientHeight);
    }, [setHeight]);

    const handleQuickCash = () => {
        ifCartValidated() && onCheckout({ paymentType: [{ type: 'CASH', amount: gradTotal }], printReceiept: false, setLoading });
    };

    const handlePrePay = () => {
        ifCartValidated() &&
            memberDetail?.prepayBalance >= gradTotal &&
            memberDetail?.prepayBalance !== 0 &&
            onCheckout({ paymentType: [{ type: 'PRE_PAY', amount: gradTotal }], printReceiept: false, setLoading: setLoading1 });
    };

    const handleNoSale = () => {
        if (!drawer) {
            dispatch(showToast({ severity: 'error', summary: 'Please select a drawer to proceed further.' }));
            return;
        }
        setOpenNoSale(true);
    };

    return (
        <div className="h-full flex flex-column justify-content-between">
            <div className="h-full">
                <CustomCard
                    extraClassName="h-full flex flex-column"
                    bodyClassName="h-full"
                    title="Cart"
                    col={12}
                    name="More Options"
                    headers={headers}
                    onClick={(event) => menu.current.toggle(event)}
                >
                    <div className="h-full flex flex-column justify-content-between" ref={ref}>
                        <div style={{ maxHeight: `${height - 200}px`, overflowY: 'auto' }}>
                            {cartItems?.length ? (
                                <>
                                    {cartItems?.map((item, i) => (
                                        <CustomAnimatedCard key={item?._id}>
                                            <CartItem
                                                index={i}
                                                item={item}
                                                onDeleteCartItem={onDeleteCartItem}
                                                onQtyChange={onQtyChange}
                                                onWaiveTax={onWaiveTax}
                                                onOverrideDiscount={onOverrideDiscount}
                                                onAddSpecialDiscount={onAddSpecialDiscount}
                                                onRemoveSpecialDiscount={onRemoveSpecialDiscount}
                                            />
                                        </CustomAnimatedCard>
                                    ))}
                                </>
                            ) : (
                                <Lottie style={{ height: '90%' }} animationData={emptyCartAnimation} loop={true} />
                            )}
                        </div>
                        <div>
                            <CartDetails
                                cartItems={cartItems}
                                cartDetails={cartDetails}
                                setAppliedPromo={setAppliedPromo}
                                appliedPromo={appliedPromo}
                                onOpenSaveCartPopup={onOpenSaveCartPopup}
                                onOpenCheckout={onOpenCheckout}
                                memberDetail={memberDetail}
                                showPrePay={showPrePay}
                                setShowPrePay={setShowPrePay}
                                additionalPrePay={additionalPrePay}
                                setAdditionalPrePay={setAdditionalPrePay}
                            />
                        </div>
                    </div>
                </CustomCard>
            </div>
            <div className="flex gap-2">
                <CustomButton className="w-full px-2" label="No Sale" severity="secondary" onClick={handleNoSale} />
                <PrimaryButton className="w-full px-1" label="Quick Cash" onClick={handleQuickCash} loading={loading} />
                <PrimaryButton className="w-full px-2" label="Pre-Pay" onClick={handlePrePay} loading={loading1} />
                <PrimaryButton className="w-full px-1" label="Card File" />
            </div>

            <NoSalePopup visible={openNoSale} setVisible={setOpenNoSale} />
            <QuickCashPopup visible={openQuickCash} setVisible={setOpenQuickCash} cartDetails={cartDetails} onCheckout={onCheckout} />
            <AddDropPopup visible={openAddDrop} setVisible={setOpenAddDrop} />
            <OpenDrawerModel visible={openDrawer} setVisible={setOpenDrawer} />
            <CloseDraweModel visible={closeDrawer} setVisible={setCloseDrawer} />
            <Menu model={items} popup ref={menu} />
            <SelectDiscountPopup visible={discountPopup} setVisible={setDiscountPopup} onApply={onApplyDiscount} />
            <SpecialDiscountPopup visible={specialDiscountPopup} setVisible={setSpecialDiscountPopup} onApply={onApplySpecialDiscount} />
        </div>
    );
}
