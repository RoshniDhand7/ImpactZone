import React, { useEffect, useState } from 'react';
import SearchMembers from './new/SearchMembers';

import Categories from './new/Categories';
import SearchCatalog from './new/SearchCatalog';
import CatalogItems from './new/CatalogItems';
import Cart from './new/Cart';
import { calculateDiscountedAmount, calculateTax, roundOfNumber } from '../../utils/taxHelpers';
import VariationPopup from './new/VariationPopup';

export default function PointOfSale2() {
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [cartDetails, setCartDetails] = useState({});

    useEffect(() => {
        let netTotal = 0;
        let tax = 0;
        let discount = 0;
        let waivedTaxAmount = 0;
        let total = 0;
        let gradTotal = 0;
        cartItems.forEach((item) => {
            netTotal += item?.netPrice * item?.quantity;
            if (item?.defaultDiscount) {
                discount += item?.defaultDiscount?.amountAfterDiscount * item?.quantity;
            }
            if (item?.taxWaived) {
                waivedTaxAmount += item?.totalTax;
            }
            tax += item?.totalTax;
            total += item?.finalTotal;
        });
        gradTotal = total + tax - waivedTaxAmount;
        setCartDetails({ netTotal, total, tax, discount, waivedTaxAmount, gradTotal });
    }, [cartItems]);

    useEffect(() => {
        let _cart = selectedItems.map((item) => {
            let { netPrice } = item;

            const { quantity, taxPercentage, allowDiscount, defaultDiscount } = item;
            const { moreThan1, moreThan2, moreThan3, unitDiscount1, unitDiscount2, unitDiscount3 } = item;
            if (quantity > moreThan1) {
                netPrice = netPrice - unitDiscount1;
            } else if (quantity > moreThan2) {
                netPrice = netPrice - unitDiscount2;
            } else if (quantity > moreThan3) {
                netPrice = netPrice - unitDiscount3;
            }

            if (allowDiscount && defaultDiscount?.amountType === 'FIXED') {
                defaultDiscount.amountAfterDiscount = defaultDiscount?.amount;
            }
            if (allowDiscount && defaultDiscount?.amountType === 'PERCENTAGE') {
                defaultDiscount.amountAfterDiscount = calculateDiscountedAmount(netPrice, defaultDiscount?.amount);
            }

            let finalNetPrice = netPrice;
            if (allowDiscount && defaultDiscount) {
                finalNetPrice = netPrice - defaultDiscount.amountAfterDiscount;
            }

            finalNetPrice = roundOfNumber(finalNetPrice);

            const finalTotal = finalNetPrice * quantity;

            const totalTax = calculateTax(finalTotal, taxPercentage);

            return { ...item, netPrice, finalNetPrice, finalTotal, totalTax };
        });

        setCartItems(_cart);
    }, [selectedItems]);

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
            let obj = {
                _id,
                subVariationId,
                name,
                itemCaption,

                taxWaived,

                netPrice,
                dynamicPricing,

                defaultDiscount,
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

    const [variationProduct, setVariationProduct] = useState(null);
    const onCloseVariation = () => {
        setVariationProduct(null);
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
                <Cart cartItems={cartItems} setSelectedItems={setSelectedItems} cartDetails={cartDetails} />
            </div>
            <VariationPopup visible={variationProduct} onCancel={onCloseVariation} onAddItemIntoCart={onAddItemIntoCart} />
        </div>
    );
}
