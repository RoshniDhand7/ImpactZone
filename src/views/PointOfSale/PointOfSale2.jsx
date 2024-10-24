import React, { useEffect, useState } from 'react';
import SearchMembers from './new/SearchMembers';
import Categories from './new/Categories';
import SearchCatalog from './new/SearchCatalog';
import CatalogItems from './new/CatalogItems';
import Cart from './new/Cart';
import { calculateDiscountedAmount, calculateTax, roundOfNumber } from '../../utils/taxHelpers';
import VariationPopup from './new/VariationPopup';
import SaveCartPopup from './new/SaveCartPopup';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSavedCartAction } from '../../redux/actions/POS/savedCartActions';
import { getRegistersAction } from '../../redux/actions/POS/registerActions';

export default function PointOfSale2() {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(getRegistersAction());
    }, [dispatch]);

    useEffect(() => {
        let id = location?.state?.savedCartId;
        if (id) {
            dispatch(
                getSavedCartAction(id, (e) => {
                    console.log(e);
                    if (e.items) {
                        setSelectedItems(e.items);
                    }
                }),
            );
        }
    }, [location]);

    const [selectedMember, setSelectedMember] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [cartDetails, setCartDetails] = useState({});
    const [variationProduct, setVariationProduct] = useState(null);

    //Count final detailed price and calculations
    useEffect(() => {
        let netTotal = 0;
        let tax = 0;
        let discount = 0;
        let specialDiscount = 0;
        let promoDiscount = 0;
        let waivedTaxAmount = 0;
        let total = 0;
        let gradTotal = 0;
        cartItems.forEach((item) => {
            netTotal += item?.netPrice * item?.quantity;
            if (item?.defaultDiscount) {
                discount += item?.defaultDiscount?.amountAfterDiscount * item?.quantity;
            }
            if (item?.specialDiscount) {
                specialDiscount += item?.specialDiscount?.amountAfterDiscount * item?.quantity;
            }
            if (item?.promoDiscount) {
                promoDiscount += item?.promoDiscount?.amountAfterDiscount * item?.quantity;
            }
            if (item?.taxWaived) {
                waivedTaxAmount += item?.totalTax;
            }
            tax += item?.totalTax;
            total += item?.finalTotal;
        });
        gradTotal = total + tax - waivedTaxAmount;
        setCartDetails({ netTotal, total, tax, discount, specialDiscount, promoDiscount, waivedTaxAmount, gradTotal });
    }, [cartItems]);

    //will create cart arr obj from selected items, will calculate all the dynamic pricing and dynamic discounts here
    useEffect(() => {
        let discounts = {};

        selectedItems.forEach((item) => {
            let { defaultDiscount } = item;
            if (defaultDiscount) {
                if (discounts[defaultDiscount._id]) {
                    discounts[defaultDiscount._id].count = discounts[defaultDiscount._id].count + 1;
                } else {
                    discounts[defaultDiscount._id] = { ...defaultDiscount, count: 1 };
                }
            }
        });
        let _cart = selectedItems.map((item) => {
            item = JSON.parse(JSON.stringify(item));
            let { netPrice } = item;

            const { quantity, taxPercentage } = item;
            const { allowDiscount, defaultDiscount, specialDiscount } = item;
            let { promoDiscount } = item;
            const { moreThan1, moreThan2, moreThan3, unitDiscount1, unitDiscount2, unitDiscount3 } = item;

            //Setting up the dynamic pricing according to the individual item count.
            if (quantity > moreThan1) {
                netPrice = netPrice - unitDiscount1;
            } else if (quantity > moreThan2) {
                netPrice = netPrice - unitDiscount2;
            } else if (quantity > moreThan3) {
                netPrice = netPrice - unitDiscount3;
            }
            // here We are getting the final net price after dynamic pricing
            let finalNetPrice = netPrice;

            //if discounts are allowed on item
            if (allowDiscount) {
                //modifing the defaultDiscount obj according to the number of products using the same discount code
                if (defaultDiscount?.multiItemDiscountCheck) {
                    let count = discounts?.[defaultDiscount?._id]?.count;

                    if (count) {
                        defaultDiscount?.multiItemDiscount.forEach((discount) => {
                            if (count >= discount?.noOfItems) {
                                defaultDiscount.amount = discount.amount;
                                defaultDiscount.amountType = discount.amountType;
                            }
                        });
                    }
                }
                //calculating the discounts according to the discount type.
                if (defaultDiscount?.amountType === 'FIXED') {
                    defaultDiscount.amountAfterDiscount = defaultDiscount?.amount;
                }
                if (defaultDiscount?.amountType === 'PERCENTAGE') {
                    defaultDiscount.amountAfterDiscount = calculateDiscountedAmount(finalNetPrice, defaultDiscount?.amount);
                }
                //If any discount is applied on item , so we subtract the discount amount from finalNetPrice
                if (defaultDiscount) {
                    finalNetPrice = finalNetPrice - defaultDiscount.amountAfterDiscount;
                }

                // calculating the special discount according to the type
                if (specialDiscount && specialDiscount?.amountType === 'FIXED') {
                    specialDiscount.amountAfterDiscount = specialDiscount?.amount;
                }
                if (specialDiscount && specialDiscount?.amountType === 'PERCENTAGE') {
                    specialDiscount.amountAfterDiscount = calculateDiscountedAmount(finalNetPrice, specialDiscount?.amount);
                }
                //If any special discount is applied on item, so we subtract the discount amount from finalNetPrice
                if (specialDiscount && specialDiscount?.amountAfterDiscount) {
                    finalNetPrice = finalNetPrice - specialDiscount?.amountAfterDiscount;
                }

                if (appliedPromo) {
                    promoDiscount = appliedPromo;

                    if (promoDiscount?.amountType === 'FIXED') {
                        promoDiscount.amountAfterDiscount = promoDiscount?.amount;
                    }
                    if (promoDiscount?.amountType === 'PERCENTAGE') {
                        promoDiscount.amountAfterDiscount = calculateDiscountedAmount(finalNetPrice, promoDiscount?.amount);
                    }
                    //If any discount is applied on item , so we subtract the discount amount from finalNetPrice
                    if (promoDiscount) {
                        finalNetPrice = finalNetPrice - promoDiscount.amountAfterDiscount;
                    }
                }
            }
            finalNetPrice = roundOfNumber(finalNetPrice);

            const finalTotal = finalNetPrice * quantity;

            const totalTax = calculateTax(finalTotal, taxPercentage);

            return { ...item, promoDiscount, netPrice, finalNetPrice, finalTotal, totalTax };
        });

        setCartItems(_cart);
    }, [selectedItems, appliedPromo]);

    //When we add something in selected items.
    const onAddItemIntoCart = (product) => {
        const index = selectedItems.findIndex((item) => item._id === product._id && item.subVariationId === product.subVariationId);
        if (index >= 0) {
            let _selected = [...selectedItems];
            let _item = _selected[index];
            if (_item.quantity < _item.maximumQuantity) {
                _item.quantity = _item.quantity + 1;
            } else {
                return;
            }
            _selected[index] = _item;
            setSelectedItems(_selected);
        } else {
            const { _id, itemCaption, name, subVariationId } = product;
            const { defaultQuantity, minimumQuantity, maximumQuantity, allowUnlimited } = product;
            const { netPrice, taxes, allowDiscount, defaultDiscount, overrideDiscount } = product;
            const { moreThan1, moreThan2, moreThan3, unitDiscount1, unitDiscount2, unitDiscount3 } = product;
            const taxPercentage = taxes.reduce((sum, item) => sum + item?.taxRatePercentage, 0);
            const taxWaived = false;
            const dynamicPricing = false;
            const quantity = defaultQuantity;

            const specialDiscount = null;
            let obj = {
                _id,
                subVariationId,
                name,
                itemCaption,

                taxWaived,

                netPrice,
                dynamicPricing,

                promoDiscount: null,
                defaultDiscount,
                specialDiscount,
                allowDiscount,
                overrideDiscount,

                taxes,
                taxPercentage,

                defaultQuantity,
                minimumQuantity,
                maximumQuantity,
                quantity,
                allowUnlimited,

                moreThan1,
                moreThan2,
                moreThan3,
                unitDiscount1,
                unitDiscount2,
                unitDiscount3,
            };
            setSelectedItems((prev) => {
                return [...prev, obj];
            });
        }
    };

    const onSelectProduct = (product) => {
        if (product?.variations?.length) {
            setVariationProduct(product);
        } else {
            onAddItemIntoCart(product);
        }
    };

    const onCloseVariation = () => {
        setVariationProduct(null);
    };

    const [saveCartPopup, setSaveCartPopup] = useState(false);
    const onCloseSaveCartPopup = () => {
        setSaveCartPopup(false);
    };

    const onOpenSaveCartPopup = () => {
        if (selectedItems?.length) {
            setSaveCartPopup(true);
        }
    };

    const onCartSaved = () => {
        setSaveCartPopup(false);
        setSelectedItems([]);
    };

    return (
        <div className="grid">
            <div className="col-2">
                <SearchCatalog onSelectProduct={onSelectProduct} />
                <Categories active={selectedCategory} setActive={setSelectedCategory} />
            </div>
            <div className="col-6">
                <CatalogItems selectedCategory={selectedCategory} onSelectProduct={onSelectProduct} />
            </div>
            <div className="col-4">
                <SearchMembers selectedMember={selectedMember} setSelectedMember={setSelectedMember} />
                <Cart
                    cartItems={cartItems}
                    setSelectedItems={setSelectedItems}
                    cartDetails={cartDetails}
                    setAppliedPromo={setAppliedPromo}
                    appliedPromo={appliedPromo}
                    onOpenSaveCartPopup={onOpenSaveCartPopup}
                />
            </div>
            <VariationPopup visible={variationProduct} onCancel={onCloseVariation} onAddItemIntoCart={onAddItemIntoCart} />
            <SaveCartPopup
                visible={saveCartPopup}
                onCancel={onCloseSaveCartPopup}
                details={{ selectedMember, selectedItems, cartDetails }}
                onCartSaved={onCartSaved}
            />
        </div>
    );
}
