import React, { useState } from 'react';
import SearchMembers from './new/SearchMembers';
import Cart from './new/Cart';
import Categories from './new/Categories';
import SearchCatalog from './new/SearchCatalog';
import CatalogItems from './new/CatalogItems';
import { calculateDiscountedAmount, calculateNetAmount } from '../../utils/taxHelpers';

export default function PointOfSale2() {
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const onAddItemIntoCart = (item) => {
        const { itemCaption, name } = item;
        const { defaultQuantity, minimumQuantity, maximumQuantity } = item;
        const { unitPrice, taxes, allowDiscount, defaultDiscount, overRideDiscount } = item;
        const { moreThan1, moreThan2, moreThan3, unitDiscount1, unitDiscount2, unitDiscount3 } = item;

        const taxWaived = false;
        const waivedTaxAmount = 0;

        const taxPercentage = taxes.reduce((sum, item) => sum + item?.taxRatePercentage, 0);
        const netPrice = calculateNetAmount(unitPrice, taxPercentage);
        const taxAmount = unitPrice - netPrice;

        let flatDiscountAmount = 0;
        let percentageDiscountAmount = 0;

        if (allowDiscount && defaultDiscount?.amountType === 'FIXED') {
            flatDiscountAmount = defaultDiscount?.amount;
        }
        if (allowDiscount && defaultDiscount?.amountType === 'PERCENTAGE') {
            percentageDiscountAmount = calculateDiscountedAmount(netPrice, defaultDiscount?.amount);
        }

        let finalUnitPrice = (netPrice - flatDiscountAmount - percentageDiscountAmount + taxAmount) * 100;
        finalUnitPrice = Math.round(finalUnitPrice);
        finalUnitPrice = finalUnitPrice / 100;

        let obj = {
            itemCaption,
            name,
            taxWaived,

            unitPrice,
            netPrice,
            taxAmount,
            flatDiscountAmount,
            percentageDiscountAmount,
            defaultDiscount,
            allowDiscount,
            overRideDiscount,

            finalUnitPrice,

            taxes,
            taxPercentage,

            defaultQuantity,
            minimumQuantity,
            maximumQuantity,
            quantity: defaultQuantity,

            moreThan1,
            moreThan2,
            moreThan3,
            unitDiscount1,
            unitDiscount2,
            unitDiscount3,

            product: item,
        };
        setCartItems((prev) => {
            return [...prev, obj];
        });
    };
    return (
        <div className="grid">
            <div className="col-2">
                <SearchCatalog selectedMember={selectedMember} setSelectedMember={setSelectedMember} />
                <Categories active={selectedCategory} setActive={setSelectedCategory} />
            </div>
            <div className="col-6">
                <CatalogItems selectedCategory={selectedCategory} onAddItemIntoCart={onAddItemIntoCart} />
            </div>
            <div className="col-4">
                <SearchMembers selectedMember={selectedMember} setSelectedMember={setSelectedMember} />
                <Cart cartItems={cartItems} setCartItems={setCartItems} />
            </div>
        </div>
    );
}
